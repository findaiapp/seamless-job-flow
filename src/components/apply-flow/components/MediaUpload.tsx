import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Mic, Play, Pause, Trash2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MediaUploadProps {
  onMediaUploaded: (mediaUrl: string, mediaType: 'video' | 'audio') => void;
  currentMediaUrl?: string;
  currentMediaType?: 'video' | 'audio';
}

const MediaUpload = ({ onMediaUploaded, currentMediaUrl, currentMediaType }: MediaUploadProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingType, setRecordingType] = useState<'video' | 'audio'>('video');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  const { toast } = useToast();

  const startRecording = async (type: 'video' | 'audio') => {
    try {
      setRecordingType(type);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: type === 'video' ? { width: 640, height: 480 } : false,
        audio: true
      });
      
      streamRef.current = stream;
      
      if (type === 'video' && videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: type === 'video' ? 'video/webm' : 'audio/webm'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: type === 'video' ? 'video/webm' : 'audio/webm'
        });
        setRecordedBlob(blob);
        
        // Create preview URL
        const url = URL.createObjectURL(blob);
        if (type === 'video' && videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = url;
        } else if (type === 'audio' && audioRef.current) {
          audioRef.current.src = url;
        }
        
        stopStream();
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Auto-stop after 15 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && isRecording) {
          stopRecording();
        }
      }, 15000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording Failed",
        description: "Unable to access camera/microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const playPreview = () => {
    const element = recordingType === 'video' ? videoRef.current : audioRef.current;
    if (element) {
      if (isPlaying) {
        element.pause();
        setIsPlaying(false);
      } else {
        element.play();
        setIsPlaying(true);
        element.onended = () => setIsPlaying(false);
      }
    }
  };

  const uploadMedia = async () => {
    if (!recordedBlob) return;
    
    setIsUploading(true);
    try {
      const fileExt = recordingType === 'video' ? 'webm' : 'webm';
      const fileName = `${recordingType}-${Date.now()}.${fileExt}`;
      const filePath = `media/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes') // Using same bucket for simplicity
        .upload(filePath, recordedBlob);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      onMediaUploaded(publicUrl, recordingType);

      toast({
        title: "Media Uploaded! 🎬",
        description: `Your ${recordingType} intro has been attached to your application.`,
      });

    } catch (error) {
      console.error('Error uploading media:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload your recording. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const clearRecording = () => {
    setRecordedBlob(null);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.src = '';
      videoRef.current.srcObject = null;
    }
    if (audioRef.current) {
      audioRef.current.src = '';
    }
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
      <CardContent className="p-4 space-y-4">
        <div className="text-center">
          <h3 className="font-semibold text-foreground mb-1">
            📹 Add a 15-second video or voice intro (optional)
          </h3>
          <p className="text-xs text-muted-foreground">
            Stand out with a personal introduction
          </p>
        </div>

        {/* Recording Controls */}
        {!recordedBlob && !currentMediaUrl && (
          <div className="flex gap-2">
            <Button
              onClick={() => startRecording('video')}
              disabled={isRecording}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <Video className="h-4 w-4 mr-2" />
              {isRecording && recordingType === 'video' ? 'Recording...' : 'Video'}
            </Button>
            <Button
              onClick={() => startRecording('audio')}
              disabled={isRecording}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <Mic className="h-4 w-4 mr-2" />
              {isRecording && recordingType === 'audio' ? 'Recording...' : 'Voice'}
            </Button>
          </div>
        )}

        {/* Recording Indicator */}
        {isRecording && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-700 dark:text-red-400">
                Recording... (15s max)
              </span>
            </div>
            <Button
              onClick={stopRecording}
              size="sm"
              className="mt-2"
            >
              Stop Recording
            </Button>
          </div>
        )}

        {/* Preview */}
        {recordedBlob && (
          <div className="space-y-3">
            {recordingType === 'video' ? (
              <video
                ref={videoRef}
                className="w-full max-h-48 bg-black rounded-lg"
                controls={false}
              />
            ) : (
              <div className="p-4 bg-muted rounded-lg text-center">
                <Mic className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Audio Recording Ready</p>
              </div>
            )}
            <audio ref={audioRef} className="hidden" />
            
            <div className="flex gap-2">
              <Button
                onClick={playPreview}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Preview'}
              </Button>
              <Button
                onClick={clearRecording}
                variant="outline"
                size="sm"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              onClick={uploadMedia}
              disabled={isUploading}
              className="w-full"
              size="sm"
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Use This {recordingType === 'video' ? 'Video' : 'Audio'}
                </div>
              )}
            </Button>
          </div>
        )}

        {/* Current Media Display */}
        {currentMediaUrl && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              ✅ {currentMediaType === 'video' ? 'Video' : 'Audio'} intro attached
            </p>
            <Button
              onClick={clearRecording}
              variant="ghost"
              size="sm"
              className="mt-1 text-green-600 dark:text-green-400"
            >
              Record New
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaUpload;