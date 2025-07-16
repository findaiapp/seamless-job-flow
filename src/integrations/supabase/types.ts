export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ab_test_assignments: {
        Row: {
          assigned_at: string
          created_at: string
          id: string
          test_name: string
          user_id: string | null
          variant: string
        }
        Insert: {
          assigned_at?: string
          created_at?: string
          id?: string
          test_name: string
          user_id?: string | null
          variant: string
        }
        Update: {
          assigned_at?: string
          created_at?: string
          id?: string
          test_name?: string
          user_id?: string | null
          variant?: string
        }
        Relationships: []
      }
      ab_test_campaigns: {
        Row: {
          city: string
          confidence_score: number | null
          created_at: string
          created_by_promoter_id: string | null
          description: string | null
          end_date: string | null
          id: string
          job_type: string
          metadata: Json | null
          start_date: string
          status: string | null
          test_name: string
          total_clicks: number | null
          total_conversions: number | null
          total_views: number | null
          winner_cta_type: string | null
          winner_headline_style: string | null
          winner_tone: string | null
          winner_variant_id: string | null
        }
        Insert: {
          city: string
          confidence_score?: number | null
          created_at?: string
          created_by_promoter_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          job_type: string
          metadata?: Json | null
          start_date?: string
          status?: string | null
          test_name: string
          total_clicks?: number | null
          total_conversions?: number | null
          total_views?: number | null
          winner_cta_type?: string | null
          winner_headline_style?: string | null
          winner_tone?: string | null
          winner_variant_id?: string | null
        }
        Update: {
          city?: string
          confidence_score?: number | null
          created_at?: string
          created_by_promoter_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          job_type?: string
          metadata?: Json | null
          start_date?: string
          status?: string | null
          test_name?: string
          total_clicks?: number | null
          total_conversions?: number | null
          total_views?: number | null
          winner_cta_type?: string | null
          winner_headline_style?: string | null
          winner_tone?: string | null
          winner_variant_id?: string | null
        }
        Relationships: []
      }
      ab_test_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          metadata: Json | null
          test_name: string
          timestamp: string
          user_id: string | null
          variant: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          metadata?: Json | null
          test_name: string
          timestamp?: string
          user_id?: string | null
          variant: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          test_name?: string
          timestamp?: string
          user_id?: string | null
          variant?: string
        }
        Relationships: []
      }
      admins: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      affiliate_click_tracking: {
        Row: {
          affiliate_rate: number
          click_source: string
          created_at: string
          estimated_commission: number
          id: string
          ip_address: string | null
          is_top_pick: boolean | null
          position: number | null
          price: number
          product_id: string
          product_title: string
          referral_code: string | null
          retailer: string
          session_id: string | null
          tracking_id: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          affiliate_rate: number
          click_source: string
          created_at?: string
          estimated_commission: number
          id?: string
          ip_address?: string | null
          is_top_pick?: boolean | null
          position?: number | null
          price: number
          product_id: string
          product_title: string
          referral_code?: string | null
          retailer: string
          session_id?: string | null
          tracking_id: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          affiliate_rate?: number
          click_source?: string
          created_at?: string
          estimated_commission?: number
          id?: string
          ip_address?: string | null
          is_top_pick?: boolean | null
          position?: number | null
          price?: number
          product_id?: string
          product_title?: string
          referral_code?: string | null
          retailer?: string
          session_id?: string | null
          tracking_id?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      affiliate_clicks: {
        Row: {
          affiliate_link: string
          click_timestamp: string
          conversion_tracked: boolean | null
          creator_ref_code: string
          estimated_payout: number | null
          fraud_score: number | null
          id: string
          ip_address: string | null
          is_validated: boolean | null
          product_id: string
          product_title: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          affiliate_link: string
          click_timestamp?: string
          conversion_tracked?: boolean | null
          creator_ref_code: string
          estimated_payout?: number | null
          fraud_score?: number | null
          id?: string
          ip_address?: string | null
          is_validated?: boolean | null
          product_id: string
          product_title: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          affiliate_link?: string
          click_timestamp?: string
          conversion_tracked?: boolean | null
          creator_ref_code?: string
          estimated_payout?: number | null
          fraud_score?: number | null
          id?: string
          ip_address?: string | null
          is_validated?: boolean | null
          product_id?: string
          product_title?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      affiliate_links: {
        Row: {
          affiliate_url: string
          asin: string
          check_frequency: number | null
          created_at: string | null
          error_count: number | null
          fallback_url: string | null
          fallback_used: boolean | null
          id: string
          is_valid: boolean | null
          last_checked: string | null
          platform: string
          response_time: number | null
          status_code: number | null
        }
        Insert: {
          affiliate_url: string
          asin: string
          check_frequency?: number | null
          created_at?: string | null
          error_count?: number | null
          fallback_url?: string | null
          fallback_used?: boolean | null
          id?: string
          is_valid?: boolean | null
          last_checked?: string | null
          platform: string
          response_time?: number | null
          status_code?: number | null
        }
        Update: {
          affiliate_url?: string
          asin?: string
          check_frequency?: number | null
          created_at?: string | null
          error_count?: number | null
          fallback_url?: string | null
          fallback_used?: boolean | null
          id?: string
          is_valid?: boolean | null
          last_checked?: string | null
          platform?: string
          response_time?: number | null
          status_code?: number | null
        }
        Relationships: []
      }
      affiliate_tracking: {
        Row: {
          affiliate_link: string
          asin: string | null
          click_id: string
          conversion_tracked: boolean | null
          created_at: string
          estimated_payout: number | null
          ip_address: string | null
          platform: string
          product_title: string
          timestamp: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          affiliate_link: string
          asin?: string | null
          click_id?: string
          conversion_tracked?: boolean | null
          created_at?: string
          estimated_payout?: number | null
          ip_address?: string | null
          platform: string
          product_title: string
          timestamp?: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          affiliate_link?: string
          asin?: string | null
          click_id?: string
          conversion_tracked?: boolean | null
          created_at?: string
          estimated_payout?: number | null
          ip_address?: string | null
          platform?: string
          product_title?: string
          timestamp?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_buying_advice: {
        Row: {
          advice_content: string
          advice_type: string | null
          asin: string | null
          confidence_score: number | null
          expires_at: string | null
          generated_at: string
          id: string
          product_id: string
          reasoning: string | null
        }
        Insert: {
          advice_content: string
          advice_type?: string | null
          asin?: string | null
          confidence_score?: number | null
          expires_at?: string | null
          generated_at?: string
          id?: string
          product_id: string
          reasoning?: string | null
        }
        Update: {
          advice_content?: string
          advice_type?: string | null
          asin?: string | null
          confidence_score?: number | null
          expires_at?: string | null
          generated_at?: string
          id?: string
          product_id?: string
          reasoning?: string | null
        }
        Relationships: []
      }
      ai_flyer_suggestions: {
        Row: {
          best_time_slot: string | null
          city: string
          confidence_score: number
          created_at: string
          expected_ctr: number | null
          expires_at: string | null
          id: string
          is_read: boolean
          job_type: string
          suggestion_text: string
          suggestion_type: string
          user_id: string | null
        }
        Insert: {
          best_time_slot?: string | null
          city: string
          confidence_score?: number
          created_at?: string
          expected_ctr?: number | null
          expires_at?: string | null
          id?: string
          is_read?: boolean
          job_type: string
          suggestion_text: string
          suggestion_type: string
          user_id?: string | null
        }
        Update: {
          best_time_slot?: string | null
          city?: string
          confidence_score?: number
          created_at?: string
          expected_ctr?: number | null
          expires_at?: string | null
          id?: string
          is_read?: boolean
          job_type?: string
          suggestion_text?: string
          suggestion_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ai_rebooking_usage: {
        Row: {
          barber_id: string
          client_id: string
          created_at: string
          id: string
          message_content: string | null
          message_sent: boolean | null
          suggestion_generated: boolean | null
          tone_used: string | null
        }
        Insert: {
          barber_id: string
          client_id: string
          created_at?: string
          id?: string
          message_content?: string | null
          message_sent?: boolean | null
          suggestion_generated?: boolean | null
          tone_used?: string | null
        }
        Update: {
          barber_id?: string
          client_id?: string
          created_at?: string
          id?: string
          message_content?: string | null
          message_sent?: boolean | null
          suggestion_generated?: boolean | null
          tone_used?: string | null
        }
        Relationships: []
      }
      ai_streak_suggestions: {
        Row: {
          barber_id: string | null
          created_at: string
          id: string
          suggestion_text: string
          suggestion_type: string
          used: boolean | null
        }
        Insert: {
          barber_id?: string | null
          created_at?: string
          id?: string
          suggestion_text: string
          suggestion_type?: string
          used?: boolean | null
        }
        Update: {
          barber_id?: string | null
          created_at?: string
          id?: string
          suggestion_text?: string
          suggestion_type?: string
          used?: boolean | null
        }
        Relationships: []
      }
      alert_logs: {
        Row: {
          alert_id: string
          clicked_at: string | null
          created_at: string
          id: string
          jobs_count: number
          method: string
          opened_at: string | null
          recipient_contact: string
          sent_at: string
          status: string
        }
        Insert: {
          alert_id: string
          clicked_at?: string | null
          created_at?: string
          id?: string
          jobs_count?: number
          method: string
          opened_at?: string | null
          recipient_contact: string
          sent_at?: string
          status?: string
        }
        Update: {
          alert_id?: string
          clicked_at?: string | null
          created_at?: string
          id?: string
          jobs_count?: number
          method?: string
          opened_at?: string | null
          recipient_contact?: string
          sent_at?: string
          status?: string
        }
        Relationships: []
      }
      alert_preferences: {
        Row: {
          created_at: string
          email_alerts: boolean | null
          frequency: string | null
          id: string
          is_active: boolean | null
          job_types: string[] | null
          location_radius: number | null
          phone_number: string | null
          sms_alerts: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_alerts?: boolean | null
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          job_types?: string[] | null
          location_radius?: number | null
          phone_number?: string | null
          sms_alerts?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_alerts?: boolean | null
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          job_types?: string[] | null
          location_radius?: number | null
          phone_number?: string | null
          sms_alerts?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      alerts: {
        Row: {
          city: string
          created_at: string
          email: string | null
          id: string
          is_active: boolean
          job_type: string
          last_notified_at: string | null
          phone: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          city: string
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          job_type: string
          last_notified_at?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          city?: string
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          job_type?: string
          last_notified_at?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      api_rate_limits: {
        Row: {
          api_key: string
          created_at: string
          id: string
          last_request: string | null
          requests_count: number
          updated_at: string
          window_start: string
        }
        Insert: {
          api_key: string
          created_at?: string
          id?: string
          last_request?: string | null
          requests_count?: number
          updated_at?: string
          window_start?: string
        }
        Update: {
          api_key?: string
          created_at?: string
          id?: string
          last_request?: string | null
          requests_count?: number
          updated_at?: string
          window_start?: string
        }
        Relationships: []
      }
      api_usage_logs: {
        Row: {
          api_key: string
          created_at: string
          endpoint: string
          error_message: string | null
          id: string
          platform: string | null
          request_data: Json | null
          response_data: Json | null
          success: boolean
          user_id: string
        }
        Insert: {
          api_key: string
          created_at?: string
          endpoint: string
          error_message?: string | null
          id?: string
          platform?: string | null
          request_data?: Json | null
          response_data?: Json | null
          success?: boolean
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string
          endpoint?: string
          error_message?: string | null
          id?: string
          platform?: string | null
          request_data?: Json | null
          response_data?: Json | null
          success?: boolean
          user_id?: string
        }
        Relationships: []
      }
      applicants: {
        Row: {
          applicant_name: string
          availability: string | null
          availability_date: string | null
          available_now: boolean | null
          city: string | null
          click_link: boolean | null
          company_name: string | null
          created_at: string
          experience_level: string | null
          follow_up_sent: boolean | null
          hot_lead_notified: boolean | null
          id: string
          job_id: string | null
          job_mood_tag: string | null
          job_slug: string | null
          job_title: string | null
          job_type: string | null
          matched_at: string | null
          matched_job_id: string | null
          notes: string | null
          phone: string | null
          referral_source: string | null
          resume_url: string | null
          score: number | null
          signed_up: boolean | null
          source: string | null
          status: string | null
          submitted_at: string | null
          updated_at: string
          user_email: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          views_count: number | null
        }
        Insert: {
          applicant_name: string
          availability?: string | null
          availability_date?: string | null
          available_now?: boolean | null
          city?: string | null
          click_link?: boolean | null
          company_name?: string | null
          created_at?: string
          experience_level?: string | null
          follow_up_sent?: boolean | null
          hot_lead_notified?: boolean | null
          id?: string
          job_id?: string | null
          job_mood_tag?: string | null
          job_slug?: string | null
          job_title?: string | null
          job_type?: string | null
          matched_at?: string | null
          matched_job_id?: string | null
          notes?: string | null
          phone?: string | null
          referral_source?: string | null
          resume_url?: string | null
          score?: number | null
          signed_up?: boolean | null
          source?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string
          user_email: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          views_count?: number | null
        }
        Update: {
          applicant_name?: string
          availability?: string | null
          availability_date?: string | null
          available_now?: boolean | null
          city?: string | null
          click_link?: boolean | null
          company_name?: string | null
          created_at?: string
          experience_level?: string | null
          follow_up_sent?: boolean | null
          hot_lead_notified?: boolean | null
          id?: string
          job_id?: string | null
          job_mood_tag?: string | null
          job_slug?: string | null
          job_title?: string | null
          job_type?: string | null
          matched_at?: string | null
          matched_job_id?: string | null
          notes?: string | null
          phone?: string | null
          referral_source?: string | null
          resume_url?: string | null
          score?: number | null
          signed_up?: boolean | null
          source?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string
          user_email?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      application_events: {
        Row: {
          city: string
          created_at: string
          id: string
          job_title: string
          referrer: string | null
          timestamp: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          job_title: string
          referrer?: string | null
          timestamp?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          job_title?: string
          referrer?: string | null
          timestamp?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      application_followups: {
        Row: {
          application_id: string
          created_at: string | null
          id: string
          reminder_sent_at: string | null
          reminder_type: string | null
        }
        Insert: {
          application_id: string
          created_at?: string | null
          id?: string
          reminder_sent_at?: string | null
          reminder_type?: string | null
        }
        Update: {
          application_id?: string
          created_at?: string | null
          id?: string
          reminder_sent_at?: string | null
          reminder_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_followups_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      application_log: {
        Row: {
          applied_at: string
          apply_day_of_week: number | null
          apply_time_hour: number | null
          company_name: string
          created_at: string
          current_status: string
          id: string
          job_id: string
          job_source: string | null
          job_title: string
          notes: string | null
          status_updated_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          applied_at?: string
          apply_day_of_week?: number | null
          apply_time_hour?: number | null
          company_name: string
          created_at?: string
          current_status?: string
          id?: string
          job_id: string
          job_source?: string | null
          job_title: string
          notes?: string | null
          status_updated_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          applied_at?: string
          apply_day_of_week?: number | null
          apply_time_hour?: number | null
          company_name?: string
          created_at?: string
          current_status?: string
          id?: string
          job_id?: string
          job_source?: string | null
          job_title?: string
          notes?: string | null
          status_updated_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          ai_generated: boolean | null
          applied_at: string | null
          availability: string | null
          company_name: string
          created_at: string | null
          email: string | null
          id: string
          job_id: string
          job_source: string | null
          job_title: string
          location: string | null
          message: string | null
          name: string | null
          phone: string | null
          position_applied_for: string | null
          preferred_company: string | null
          ref_source: string | null
          referral_code: string | null
          resume_url: string | null
          role: string | null
          seeker_id: string | null
          skills_description: string | null
          status: string | null
          submitted_at: string | null
          updated_at: string | null
          user_input: string | null
          why_you: string | null
        }
        Insert: {
          ai_generated?: boolean | null
          applied_at?: string | null
          availability?: string | null
          company_name: string
          created_at?: string | null
          email?: string | null
          id?: string
          job_id: string
          job_source?: string | null
          job_title: string
          location?: string | null
          message?: string | null
          name?: string | null
          phone?: string | null
          position_applied_for?: string | null
          preferred_company?: string | null
          ref_source?: string | null
          referral_code?: string | null
          resume_url?: string | null
          role?: string | null
          seeker_id?: string | null
          skills_description?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_input?: string | null
          why_you?: string | null
        }
        Update: {
          ai_generated?: boolean | null
          applied_at?: string | null
          availability?: string | null
          company_name?: string
          created_at?: string | null
          email?: string | null
          id?: string
          job_id?: string
          job_source?: string | null
          job_title?: string
          location?: string | null
          message?: string | null
          name?: string | null
          phone?: string | null
          position_applied_for?: string | null
          preferred_company?: string | null
          ref_source?: string | null
          referral_code?: string | null
          resume_url?: string | null
          role?: string | null
          seeker_id?: string | null
          skills_description?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_input?: string | null
          why_you?: string | null
        }
        Relationships: []
      }
      apply_queue: {
        Row: {
          company_name: string
          created_at: string
          id: string
          job_data: Json
          job_id: string
          job_title: string
          match_reason: string | null
          match_score: number
          scheduled_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name: string
          created_at?: string
          id?: string
          job_data?: Json
          job_id: string
          job_title: string
          match_reason?: string | null
          match_score?: number
          scheduled_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: string
          job_data?: Json
          job_id?: string
          job_title?: string
          match_reason?: string | null
          match_score?: number
          scheduled_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      apply_settings: {
        Row: {
          apply_interval: number
          auto_apply_enabled: boolean
          created_at: string
          id: string
          max_daily_applications: number
          preferred_tone: string
          stealth_mode: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          apply_interval?: number
          auto_apply_enabled?: boolean
          created_at?: string
          id?: string
          max_daily_applications?: number
          preferred_tone?: string
          stealth_mode?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          apply_interval?: number
          auto_apply_enabled?: boolean
          created_at?: string
          id?: string
          max_daily_applications?: number
          preferred_tone?: string
          stealth_mode?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string
          barber_id: string
          client_id: string
          completed_at: string | null
          created_at: string
          id: string
          notes: string | null
          payout_amount: number | null
          payout_processed: boolean | null
          service_type: string
          status: string | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          appointment_date: string
          barber_id: string
          client_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          payout_amount?: number | null
          payout_processed?: boolean | null
          service_type?: string
          status?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          barber_id?: string
          client_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          payout_amount?: number | null
          payout_processed?: boolean | null
          service_type?: string
          status?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client_appointment_patterns"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "cut_streak_leaderboard"
            referencedColumns: ["client_id"]
          },
        ]
      }
      attribution_events: {
        Row: {
          attribution_value: number | null
          click_id: string | null
          event_type: string
          id: string
          metadata: Json | null
          referrer_barber_id: string | null
          timestamp: string
          user_id: string | null
        }
        Insert: {
          attribution_value?: number | null
          click_id?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          referrer_barber_id?: string | null
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          attribution_value?: number | null
          click_id?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          referrer_barber_id?: string | null
          timestamp?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attribution_events_click_id_fkey"
            columns: ["click_id"]
            isOneToOne: false
            referencedRelation: "share_clicks"
            referencedColumns: ["id"]
          },
        ]
      }
      auto_flex_cards: {
        Row: {
          auto_posted: boolean | null
          auto_posted_at: string | null
          barber_location: string
          barber_name: string
          bookings_generated: number | null
          card_style: Json
          created_at: string
          ctr_percentage: number | null
          engagement_stats: Json | null
          evolution_status: string | null
          evolution_tier: number
          flex_caption: string
          generated_at: string
          id: string
          last_performance_check: string | null
          original_caption_preview: string | null
          reward_amount: number
          reward_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_posted?: boolean | null
          auto_posted_at?: string | null
          barber_location: string
          barber_name: string
          bookings_generated?: number | null
          card_style?: Json
          created_at?: string
          ctr_percentage?: number | null
          engagement_stats?: Json | null
          evolution_status?: string | null
          evolution_tier: number
          flex_caption: string
          generated_at?: string
          id?: string
          last_performance_check?: string | null
          original_caption_preview?: string | null
          reward_amount: number
          reward_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_posted?: boolean | null
          auto_posted_at?: string | null
          barber_location?: string
          barber_name?: string
          bookings_generated?: number | null
          card_style?: Json
          created_at?: string
          ctr_percentage?: number | null
          engagement_stats?: Json | null
          evolution_status?: string | null
          evolution_tier?: number
          flex_caption?: string
          generated_at?: string
          id?: string
          last_performance_check?: string | null
          original_caption_preview?: string | null
          reward_amount?: number
          reward_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      auto_post_ab_tests: {
        Row: {
          city: string
          confidence_score: number | null
          created_at: string
          end_date: string | null
          id: string
          job_type: string
          results: Json | null
          start_date: string
          test_name: string
          test_type: string
          updated_at: string
          variant_a_post_id: string | null
          variant_b_post_id: string | null
          winner_variant: string | null
        }
        Insert: {
          city: string
          confidence_score?: number | null
          created_at?: string
          end_date?: string | null
          id?: string
          job_type: string
          results?: Json | null
          start_date: string
          test_name: string
          test_type: string
          updated_at?: string
          variant_a_post_id?: string | null
          variant_b_post_id?: string | null
          winner_variant?: string | null
        }
        Update: {
          city?: string
          confidence_score?: number | null
          created_at?: string
          end_date?: string | null
          id?: string
          job_type?: string
          results?: Json | null
          start_date?: string
          test_name?: string
          test_type?: string
          updated_at?: string
          variant_a_post_id?: string | null
          variant_b_post_id?: string | null
          winner_variant?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auto_post_ab_tests_variant_a_post_id_fkey"
            columns: ["variant_a_post_id"]
            isOneToOne: false
            referencedRelation: "scheduled_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "auto_post_ab_tests_variant_b_post_id_fkey"
            columns: ["variant_b_post_id"]
            isOneToOne: false
            referencedRelation: "scheduled_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      auto_post_campaigns: {
        Row: {
          campaign_name: string
          created_at: string
          created_by_admin_id: string | null
          frequency: string
          id: string
          language_split: Json | null
          post_time: string
          settings: Json | null
          status: string
          target_cities: string[]
          tone_rotation: string[] | null
          updated_at: string
        }
        Insert: {
          campaign_name: string
          created_at?: string
          created_by_admin_id?: string | null
          frequency?: string
          id?: string
          language_split?: Json | null
          post_time?: string
          settings?: Json | null
          status?: string
          target_cities: string[]
          tone_rotation?: string[] | null
          updated_at?: string
        }
        Update: {
          campaign_name?: string
          created_at?: string
          created_by_admin_id?: string | null
          frequency?: string
          id?: string
          language_split?: Json | null
          post_time?: string
          settings?: Json | null
          status?: string
          target_cities?: string[]
          tone_rotation?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      auto_post_performance: {
        Row: {
          city: string
          conversion_rate: number | null
          created_at: string
          ctr_rate: number | null
          date: string
          flagged: boolean | null
          id: string
          post_id: string | null
          referrals: number | null
          scans: number | null
          signups: number | null
        }
        Insert: {
          city: string
          conversion_rate?: number | null
          created_at?: string
          ctr_rate?: number | null
          date: string
          flagged?: boolean | null
          id?: string
          post_id?: string | null
          referrals?: number | null
          scans?: number | null
          signups?: number | null
        }
        Update: {
          city?: string
          conversion_rate?: number | null
          created_at?: string
          ctr_rate?: number | null
          date?: string
          flagged?: boolean | null
          id?: string
          post_id?: string | null
          referrals?: number | null
          scans?: number | null
          signups?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "auto_post_performance_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "scheduled_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      backlink_outreach: {
        Row: {
          anchor_text: string
          backlink_acquired: boolean | null
          campaign_city: string | null
          campaign_job_type: string | null
          contact_name: string | null
          created_at: string
          domain_authority: number | null
          follow_up_date: string | null
          id: string
          outreach_content: string | null
          outreach_date: string | null
          outreach_subject: string | null
          response_date: string | null
          response_received: boolean | null
          status: string
          target_email: string | null
          target_site: string
          target_url: string
          updated_at: string
        }
        Insert: {
          anchor_text: string
          backlink_acquired?: boolean | null
          campaign_city?: string | null
          campaign_job_type?: string | null
          contact_name?: string | null
          created_at?: string
          domain_authority?: number | null
          follow_up_date?: string | null
          id?: string
          outreach_content?: string | null
          outreach_date?: string | null
          outreach_subject?: string | null
          response_date?: string | null
          response_received?: boolean | null
          status?: string
          target_email?: string | null
          target_site: string
          target_url: string
          updated_at?: string
        }
        Update: {
          anchor_text?: string
          backlink_acquired?: boolean | null
          campaign_city?: string | null
          campaign_job_type?: string | null
          contact_name?: string | null
          created_at?: string
          domain_authority?: number | null
          follow_up_date?: string | null
          id?: string
          outreach_content?: string | null
          outreach_date?: string | null
          outreach_subject?: string | null
          response_date?: string | null
          response_received?: boolean | null
          status?: string
          target_email?: string | null
          target_site?: string
          target_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      badge_share_events: {
        Row: {
          badge_id: string
          barber_id: string
          created_at: string
          id: string
          platform: string
          share_type: string
        }
        Insert: {
          badge_id: string
          barber_id: string
          created_at?: string
          id?: string
          platform: string
          share_type: string
        }
        Update: {
          badge_id?: string
          barber_id?: string
          created_at?: string
          id?: string
          platform?: string
          share_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "badge_share_events_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "weekly_remix_badges"
            referencedColumns: ["id"]
          },
        ]
      }
      barber_availability: {
        Row: {
          barber_id: string
          break_windows: Json | null
          created_at: string | null
          end_time: string
          id: string
          is_active: boolean | null
          max_appointments: number
          start_time: string
          updated_at: string | null
          weekday: number
        }
        Insert: {
          barber_id: string
          break_windows?: Json | null
          created_at?: string | null
          end_time: string
          id?: string
          is_active?: boolean | null
          max_appointments?: number
          start_time: string
          updated_at?: string | null
          weekday: number
        }
        Update: {
          barber_id?: string
          break_windows?: Json | null
          created_at?: string | null
          end_time?: string
          id?: string
          is_active?: boolean | null
          max_appointments?: number
          start_time?: string
          updated_at?: string | null
          weekday?: number
        }
        Relationships: []
      }
      barber_discovery_tags: {
        Row: {
          barber_id: string | null
          created_at: string | null
          id: string
          search_priority: number | null
          tag_type: string
          tag_value: string
          updated_at: string | null
        }
        Insert: {
          barber_id?: string | null
          created_at?: string | null
          id?: string
          search_priority?: number | null
          tag_type: string
          tag_value: string
          updated_at?: string | null
        }
        Update: {
          barber_id?: string | null
          created_at?: string | null
          id?: string
          search_priority?: number | null
          tag_type?: string
          tag_value?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "barber_discovery_tags_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_discovery_tags_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barber_discovery_tags_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_discovery_tags_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_discovery_tags_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
        ]
      }
      barber_external_sources: {
        Row: {
          address: string
          business_hours: Json | null
          created_at: string
          facebook_url: string | null
          id: string
          instagram_handle: string | null
          is_open_now: boolean | null
          last_updated: string | null
          latitude: number
          longitude: number
          metadata: Json | null
          name: string
          phone: string | null
          photo_urls: string[] | null
          price_range: string | null
          rating: number | null
          source_id: string
          source_platform: string
          specialties: string[] | null
          tiktok_handle: string | null
          total_reviews: number | null
          vibe_tags: string[] | null
          website: string | null
        }
        Insert: {
          address: string
          business_hours?: Json | null
          created_at?: string
          facebook_url?: string | null
          id?: string
          instagram_handle?: string | null
          is_open_now?: boolean | null
          last_updated?: string | null
          latitude: number
          longitude: number
          metadata?: Json | null
          name: string
          phone?: string | null
          photo_urls?: string[] | null
          price_range?: string | null
          rating?: number | null
          source_id: string
          source_platform: string
          specialties?: string[] | null
          tiktok_handle?: string | null
          total_reviews?: number | null
          vibe_tags?: string[] | null
          website?: string | null
        }
        Update: {
          address?: string
          business_hours?: Json | null
          created_at?: string
          facebook_url?: string | null
          id?: string
          instagram_handle?: string | null
          is_open_now?: boolean | null
          last_updated?: string | null
          latitude?: number
          longitude?: number
          metadata?: Json | null
          name?: string
          phone?: string | null
          photo_urls?: string[] | null
          price_range?: string | null
          rating?: number | null
          source_id?: string
          source_platform?: string
          specialties?: string[] | null
          tiktok_handle?: string | null
          total_reviews?: number | null
          vibe_tags?: string[] | null
          website?: string | null
        }
        Relationships: []
      }
      barber_leaderboard_rankings: {
        Row: {
          barber_id: string
          city: string | null
          city_rank: number | null
          country: string | null
          created_at: string | null
          global_rank: number | null
          id: string
          last_updated: string | null
          last_week_city_rank: number | null
          last_week_global_rank: number | null
          last_week_state_rank: number | null
          month_referrals: number | null
          rank_movement: number | null
          state: string | null
          state_rank: number | null
          tier: string | null
          total_referrals: number | null
          week_referrals: number | null
        }
        Insert: {
          barber_id: string
          city?: string | null
          city_rank?: number | null
          country?: string | null
          created_at?: string | null
          global_rank?: number | null
          id?: string
          last_updated?: string | null
          last_week_city_rank?: number | null
          last_week_global_rank?: number | null
          last_week_state_rank?: number | null
          month_referrals?: number | null
          rank_movement?: number | null
          state?: string | null
          state_rank?: number | null
          tier?: string | null
          total_referrals?: number | null
          week_referrals?: number | null
        }
        Update: {
          barber_id?: string
          city?: string | null
          city_rank?: number | null
          country?: string | null
          created_at?: string | null
          global_rank?: number | null
          id?: string
          last_updated?: string | null
          last_week_city_rank?: number | null
          last_week_global_rank?: number | null
          last_week_state_rank?: number | null
          month_referrals?: number | null
          rank_movement?: number | null
          state?: string | null
          state_rank?: number | null
          tier?: string | null
          total_referrals?: number | null
          week_referrals?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "barber_leaderboard_rankings_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: true
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_leaderboard_rankings_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: true
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barber_leaderboard_rankings_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: true
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_leaderboard_rankings_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: true
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_leaderboard_rankings_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: true
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
        ]
      }
      barber_plans: {
        Row: {
          barber_id: string
          created_at: string | null
          cuts_included: number
          description: string | null
          first_cut_free: boolean | null
          id: string
          is_active: boolean | null
          plan_name: string
          price_per_month: number
          updated_at: string | null
        }
        Insert: {
          barber_id: string
          created_at?: string | null
          cuts_included: number
          description?: string | null
          first_cut_free?: boolean | null
          id?: string
          is_active?: boolean | null
          plan_name: string
          price_per_month: number
          updated_at?: string | null
        }
        Update: {
          barber_id?: string
          created_at?: string | null
          cuts_included?: number
          description?: string | null
          first_cut_free?: boolean | null
          id?: string
          is_active?: boolean | null
          plan_name?: string
          price_per_month?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      barber_referrals: {
        Row: {
          bonus_amount: number | null
          bonus_paid: boolean | null
          created_at: string | null
          id: string
          referral_code: string
          referred_user_id: string
          referred_user_type: string
          referrer_barber_id: string
          updated_at: string | null
        }
        Insert: {
          bonus_amount?: number | null
          bonus_paid?: boolean | null
          created_at?: string | null
          id?: string
          referral_code: string
          referred_user_id: string
          referred_user_type: string
          referrer_barber_id: string
          updated_at?: string | null
        }
        Update: {
          bonus_amount?: number | null
          bonus_paid?: boolean | null
          created_at?: string | null
          id?: string
          referral_code?: string
          referred_user_id?: string
          referred_user_type?: string
          referrer_barber_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "barber_referrals_referrer_barber_id_fkey"
            columns: ["referrer_barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_referrals_referrer_barber_id_fkey"
            columns: ["referrer_barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barber_referrals_referrer_barber_id_fkey"
            columns: ["referrer_barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_referrals_referrer_barber_id_fkey"
            columns: ["referrer_barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_referrals_referrer_barber_id_fkey"
            columns: ["referrer_barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
        ]
      }
      barber_regions: {
        Row: {
          assigned_at: string | null
          barber_id: string
          id: string
          region_id: string
        }
        Insert: {
          assigned_at?: string | null
          barber_id: string
          id?: string
          region_id: string
        }
        Update: {
          assigned_at?: string | null
          barber_id?: string
          id?: string
          region_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "barber_regions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_regions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barber_regions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_regions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_regions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_regions_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      barber_reviews: {
        Row: {
          barber_id: string
          client_id: string
          created_at: string | null
          id: string
          rating: number
          review_text: string | null
          service_type: string | null
          updated_at: string | null
        }
        Insert: {
          barber_id: string
          client_id: string
          created_at?: string | null
          id?: string
          rating: number
          review_text?: string | null
          service_type?: string | null
          updated_at?: string | null
        }
        Update: {
          barber_id?: string
          client_id?: string
          created_at?: string | null
          id?: string
          rating?: number
          review_text?: string | null
          service_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "barber_reviews_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_reviews_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barber_reviews_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_reviews_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barber_reviews_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
        ]
      }
      barber_share_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          metadata: Json | null
          platform: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          platform?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          platform?: string | null
          user_id?: string
        }
        Relationships: []
      }
      barber_social_settings: {
        Row: {
          auto_flex_enabled: boolean | null
          auto_post_enabled: boolean | null
          created_at: string
          custom_hashtags: string[] | null
          id: string
          instagram_connected: boolean | null
          preferred_platforms: string[] | null
          tiktok_connected: boolean | null
          twitter_connected: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_flex_enabled?: boolean | null
          auto_post_enabled?: boolean | null
          created_at?: string
          custom_hashtags?: string[] | null
          id?: string
          instagram_connected?: boolean | null
          preferred_platforms?: string[] | null
          tiktok_connected?: boolean | null
          twitter_connected?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_flex_enabled?: boolean | null
          auto_post_enabled?: boolean | null
          created_at?: string
          custom_hashtags?: string[] | null
          id?: string
          instagram_connected?: boolean | null
          preferred_platforms?: string[] | null
          tiktok_connected?: boolean | null
          twitter_connected?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      barbers: {
        Row: {
          borough: string | null
          business_goal_data: Json | null
          city: string | null
          competitive_advantage: string | null
          created_at: string
          customer_appeal: number | null
          discovery_priority: number | null
          email: string
          evolved_captions_count: number | null
          full_name: string
          gpt_quality_indicators: string[] | null
          gpt_rebooking_prefs: Json | null
          hall_of_fame_badge: boolean | null
          hall_of_fame_rank: number | null
          hall_of_fame_week: string | null
          has_evolved_caption: boolean | null
          id: string
          instagram_handle: string | null
          last_remix_at: string | null
          last_reward_earned_at: string | null
          latitude: number | null
          location: string
          longitude: number | null
          map_visible: boolean | null
          market_positioning: string | null
          metro_area: string | null
          mindset_type: string | null
          mood_status: string | null
          neighborhood: string | null
          onboarding_completed: boolean | null
          onboarding_step: number | null
          phone: string
          plan_tier: string | null
          price_range: string | null
          profile_keywords: string[] | null
          profile_photo_url: string | null
          profile_video_url: string | null
          rating: number | null
          referral_code: string | null
          referral_source: string | null
          referred_by: string | null
          reward_preference: string | null
          services_offered: string[] | null
          setup_details: Json | null
          social_links: Json | null
          source: string | null
          stripe_account_id: string | null
          stripe_connect_completed_at: string | null
          stripe_connect_onboarding_url: string | null
          stripe_onboarding_complete: boolean | null
          terms_accepted: boolean | null
          total_caption_remixes: number | null
          total_evolution_rewards: number | null
          total_reviews: number | null
          updated_at: string
          user_id: string | null
          vibe_score: number | null
          vibe_tags: string[] | null
        }
        Insert: {
          borough?: string | null
          business_goal_data?: Json | null
          city?: string | null
          competitive_advantage?: string | null
          created_at?: string
          customer_appeal?: number | null
          discovery_priority?: number | null
          email: string
          evolved_captions_count?: number | null
          full_name: string
          gpt_quality_indicators?: string[] | null
          gpt_rebooking_prefs?: Json | null
          hall_of_fame_badge?: boolean | null
          hall_of_fame_rank?: number | null
          hall_of_fame_week?: string | null
          has_evolved_caption?: boolean | null
          id?: string
          instagram_handle?: string | null
          last_remix_at?: string | null
          last_reward_earned_at?: string | null
          latitude?: number | null
          location: string
          longitude?: number | null
          map_visible?: boolean | null
          market_positioning?: string | null
          metro_area?: string | null
          mindset_type?: string | null
          mood_status?: string | null
          neighborhood?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          phone: string
          plan_tier?: string | null
          price_range?: string | null
          profile_keywords?: string[] | null
          profile_photo_url?: string | null
          profile_video_url?: string | null
          rating?: number | null
          referral_code?: string | null
          referral_source?: string | null
          referred_by?: string | null
          reward_preference?: string | null
          services_offered?: string[] | null
          setup_details?: Json | null
          social_links?: Json | null
          source?: string | null
          stripe_account_id?: string | null
          stripe_connect_completed_at?: string | null
          stripe_connect_onboarding_url?: string | null
          stripe_onboarding_complete?: boolean | null
          terms_accepted?: boolean | null
          total_caption_remixes?: number | null
          total_evolution_rewards?: number | null
          total_reviews?: number | null
          updated_at?: string
          user_id?: string | null
          vibe_score?: number | null
          vibe_tags?: string[] | null
        }
        Update: {
          borough?: string | null
          business_goal_data?: Json | null
          city?: string | null
          competitive_advantage?: string | null
          created_at?: string
          customer_appeal?: number | null
          discovery_priority?: number | null
          email?: string
          evolved_captions_count?: number | null
          full_name?: string
          gpt_quality_indicators?: string[] | null
          gpt_rebooking_prefs?: Json | null
          hall_of_fame_badge?: boolean | null
          hall_of_fame_rank?: number | null
          hall_of_fame_week?: string | null
          has_evolved_caption?: boolean | null
          id?: string
          instagram_handle?: string | null
          last_remix_at?: string | null
          last_reward_earned_at?: string | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          map_visible?: boolean | null
          market_positioning?: string | null
          metro_area?: string | null
          mindset_type?: string | null
          mood_status?: string | null
          neighborhood?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          phone?: string
          plan_tier?: string | null
          price_range?: string | null
          profile_keywords?: string[] | null
          profile_photo_url?: string | null
          profile_video_url?: string | null
          rating?: number | null
          referral_code?: string | null
          referral_source?: string | null
          referred_by?: string | null
          reward_preference?: string | null
          services_offered?: string[] | null
          setup_details?: Json | null
          social_links?: Json | null
          source?: string | null
          stripe_account_id?: string | null
          stripe_connect_completed_at?: string | null
          stripe_connect_onboarding_url?: string | null
          stripe_onboarding_complete?: boolean | null
          terms_accepted?: boolean | null
          total_caption_remixes?: number | null
          total_evolution_rewards?: number | null
          total_reviews?: number | null
          updated_at?: string
          user_id?: string | null
          vibe_score?: number | null
          vibe_tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "barbers_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barbers_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barbers_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barbers_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "barbers_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
        ]
      }
      bonus_rewards: {
        Row: {
          barber_id: string
          client_id: string
          created_at: string
          id: string
          reward_type: Database["public"]["Enums"]["reward_type"]
          reward_value: number
          status: string
          tip_id: string | null
        }
        Insert: {
          barber_id: string
          client_id: string
          created_at?: string
          id?: string
          reward_type: Database["public"]["Enums"]["reward_type"]
          reward_value: number
          status?: string
          tip_id?: string | null
        }
        Update: {
          barber_id?: string
          client_id?: string
          created_at?: string
          id?: string
          reward_type?: Database["public"]["Enums"]["reward_type"]
          reward_value?: number
          status?: string
          tip_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bonus_rewards_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bonus_rewards_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "client_streak_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bonus_rewards_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bonus_rewards_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "barber_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bonus_rewards_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client_streak_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bonus_rewards_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bonus_rewards_tip_id_fkey"
            columns: ["tip_id"]
            isOneToOne: false
            referencedRelation: "client_tips"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_requests: {
        Row: {
          barber_id: string | null
          client_email: string
          client_name: string
          client_phone: string
          created_at: string | null
          id: string
          message: string | null
          source: string | null
          status: string | null
          updated_at: string | null
          utm_params: Json | null
        }
        Insert: {
          barber_id?: string | null
          client_email: string
          client_name: string
          client_phone: string
          created_at?: string | null
          id?: string
          message?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          utm_params?: Json | null
        }
        Update: {
          barber_id?: string | null
          client_email?: string
          client_name?: string
          client_phone?: string
          created_at?: string | null
          id?: string
          message?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          utm_params?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_requests_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "booking_requests_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "booking_requests_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "booking_requests_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
        ]
      }
      brand_filter_clicks: {
        Row: {
          brand: string
          created_at: string
          id: string
          session_id: string | null
          timestamp: string
          user_id: string | null
        }
        Insert: {
          brand: string
          created_at?: string
          id?: string
          session_id?: string | null
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          brand?: string
          created_at?: string
          id?: string
          session_id?: string | null
          timestamp?: string
          user_id?: string | null
        }
        Relationships: []
      }
      bulk_flyer_campaigns: {
        Row: {
          completed_flyers: number | null
          created_at: string
          created_by_promoter_id: string | null
          csv_data: Json | null
          description: string | null
          download_url: string | null
          id: string
          status: string | null
          title: string
          total_flyers: number | null
        }
        Insert: {
          completed_flyers?: number | null
          created_at?: string
          created_by_promoter_id?: string | null
          csv_data?: Json | null
          description?: string | null
          download_url?: string | null
          id?: string
          status?: string | null
          title: string
          total_flyers?: number | null
        }
        Update: {
          completed_flyers?: number | null
          created_at?: string
          created_by_promoter_id?: string | null
          csv_data?: Json | null
          description?: string | null
          download_url?: string | null
          id?: string
          status?: string | null
          title?: string
          total_flyers?: number | null
        }
        Relationships: []
      }
      caption_ab_tests: {
        Row: {
          confidence_score: number | null
          created_at: string
          end_date: string | null
          id: string
          start_date: string
          status: string
          streak_card_id: string
          test_name: string | null
          total_clicks: number | null
          total_impressions: number | null
          total_referrals: number | null
          total_shares: number | null
          updated_at: string
          user_id: string
          winner_variant_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          end_date?: string | null
          id?: string
          start_date?: string
          status?: string
          streak_card_id: string
          test_name?: string | null
          total_clicks?: number | null
          total_impressions?: number | null
          total_referrals?: number | null
          total_shares?: number | null
          updated_at?: string
          user_id: string
          winner_variant_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          end_date?: string | null
          id?: string
          start_date?: string
          status?: string
          streak_card_id?: string
          test_name?: string | null
          total_clicks?: number | null
          total_impressions?: number | null
          total_referrals?: number | null
          total_shares?: number | null
          updated_at?: string
          user_id?: string
          winner_variant_id?: string | null
        }
        Relationships: []
      }
      caption_hall_of_fame_performance: {
        Row: {
          barber_id: string | null
          barber_location: string | null
          barber_name: string | null
          bookings_generated: number | null
          caption_text: string
          clicks: number | null
          created_at: string
          id: string
          map_share_event_id: string | null
          shares: number | null
          updated_at: string
          viral_score: number | null
          week_start_date: string
        }
        Insert: {
          barber_id?: string | null
          barber_location?: string | null
          barber_name?: string | null
          bookings_generated?: number | null
          caption_text: string
          clicks?: number | null
          created_at?: string
          id?: string
          map_share_event_id?: string | null
          shares?: number | null
          updated_at?: string
          viral_score?: number | null
          week_start_date?: string
        }
        Update: {
          barber_id?: string | null
          barber_location?: string | null
          barber_name?: string | null
          bookings_generated?: number | null
          caption_text?: string
          clicks?: number | null
          created_at?: string
          id?: string
          map_share_event_id?: string | null
          shares?: number | null
          updated_at?: string
          viral_score?: number | null
          week_start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "caption_hall_of_fame_performance_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "caption_hall_of_fame_performance_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "caption_hall_of_fame_performance_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "caption_hall_of_fame_performance_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "caption_hall_of_fame_performance_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "caption_hall_of_fame_performance_map_share_event_id_fkey"
            columns: ["map_share_event_id"]
            isOneToOne: false
            referencedRelation: "map_share_events"
            referencedColumns: ["id"]
          },
        ]
      }
      caption_pattern_profiles: {
        Row: {
          average_conversion_rate: number | null
          average_viral_score: number | null
          call_to_action_patterns: Json | null
          confidence_score: number | null
          created_at: string
          effective_emoji_positions: Json | null
          emoji_usage_patterns: Json | null
          high_impact_keywords: Json | null
          id: string
          keyword_performance_scores: Json | null
          last_updated: string
          learning_insights: Json | null
          length_performance_data: Json | null
          optimal_caption_length_range: Json | null
          optimal_posting_times: Json | null
          pattern_confidence_levels: Json | null
          platform_timing_preferences: Json | null
          tone_performance_map: Json | null
          top_performing_emojis: Json | null
          top_performing_tones: Json | null
          total_tests_analyzed: number | null
          user_id: string
          winning_caption_structures: Json | null
        }
        Insert: {
          average_conversion_rate?: number | null
          average_viral_score?: number | null
          call_to_action_patterns?: Json | null
          confidence_score?: number | null
          created_at?: string
          effective_emoji_positions?: Json | null
          emoji_usage_patterns?: Json | null
          high_impact_keywords?: Json | null
          id?: string
          keyword_performance_scores?: Json | null
          last_updated?: string
          learning_insights?: Json | null
          length_performance_data?: Json | null
          optimal_caption_length_range?: Json | null
          optimal_posting_times?: Json | null
          pattern_confidence_levels?: Json | null
          platform_timing_preferences?: Json | null
          tone_performance_map?: Json | null
          top_performing_emojis?: Json | null
          top_performing_tones?: Json | null
          total_tests_analyzed?: number | null
          user_id: string
          winning_caption_structures?: Json | null
        }
        Update: {
          average_conversion_rate?: number | null
          average_viral_score?: number | null
          call_to_action_patterns?: Json | null
          confidence_score?: number | null
          created_at?: string
          effective_emoji_positions?: Json | null
          emoji_usage_patterns?: Json | null
          high_impact_keywords?: Json | null
          id?: string
          keyword_performance_scores?: Json | null
          last_updated?: string
          learning_insights?: Json | null
          length_performance_data?: Json | null
          optimal_caption_length_range?: Json | null
          optimal_posting_times?: Json | null
          pattern_confidence_levels?: Json | null
          platform_timing_preferences?: Json | null
          tone_performance_map?: Json | null
          top_performing_emojis?: Json | null
          top_performing_tones?: Json | null
          total_tests_analyzed?: number | null
          user_id?: string
          winning_caption_structures?: Json | null
        }
        Relationships: []
      }
      caption_performance: {
        Row: {
          caption_text: string
          click_rate: number | null
          client_vibe: string
          conversion_clicks: number | null
          conversion_rate: number | null
          created_at: string | null
          cut_type: string
          evolution_tier: number | null
          evolved: boolean | null
          evolved_at: string | null
          evolved_score: number | null
          hashtags: string[] | null
          id: string
          language_code: string | null
          last_used_at: string | null
          music_track: string | null
          platform: string
          referral_clicks: number | null
          shares_count: number | null
          times_evolved: number | null
          tone: string
          total_clicks: number | null
          unique_clicks: number | null
          usage_count: number | null
          user_id: string
          viral_score: number | null
        }
        Insert: {
          caption_text: string
          click_rate?: number | null
          client_vibe: string
          conversion_clicks?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          cut_type: string
          evolution_tier?: number | null
          evolved?: boolean | null
          evolved_at?: string | null
          evolved_score?: number | null
          hashtags?: string[] | null
          id?: string
          language_code?: string | null
          last_used_at?: string | null
          music_track?: string | null
          platform: string
          referral_clicks?: number | null
          shares_count?: number | null
          times_evolved?: number | null
          tone: string
          total_clicks?: number | null
          unique_clicks?: number | null
          usage_count?: number | null
          user_id: string
          viral_score?: number | null
        }
        Update: {
          caption_text?: string
          click_rate?: number | null
          client_vibe?: string
          conversion_clicks?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          cut_type?: string
          evolution_tier?: number | null
          evolved?: boolean | null
          evolved_at?: string | null
          evolved_score?: number | null
          hashtags?: string[] | null
          id?: string
          language_code?: string | null
          last_used_at?: string | null
          music_track?: string | null
          platform?: string
          referral_clicks?: number | null
          shares_count?: number | null
          times_evolved?: number | null
          tone?: string
          total_clicks?: number | null
          unique_clicks?: number | null
          usage_count?: number | null
          user_id?: string
          viral_score?: number | null
        }
        Relationships: []
      }
      caption_performance_tracking: {
        Row: {
          caption_id: string
          city: string | null
          clicks: number | null
          created_at: string
          ctr: number | null
          id: string
          impressions: number | null
          language: string | null
          signups: number | null
          tracking_date: string
        }
        Insert: {
          caption_id: string
          city?: string | null
          clicks?: number | null
          created_at?: string
          ctr?: number | null
          id?: string
          impressions?: number | null
          language?: string | null
          signups?: number | null
          tracking_date?: string
        }
        Update: {
          caption_id?: string
          city?: string | null
          clicks?: number | null
          created_at?: string
          ctr?: number | null
          id?: string
          impressions?: number | null
          language?: string | null
          signups?: number | null
          tracking_date?: string
        }
        Relationships: []
      }
      caption_remix_logs: {
        Row: {
          created_at: string
          custom_hashtags: string[] | null
          generated_variations: string[]
          id: string
          original_caption: string
          remix_platform: string
          remix_tone: string
          selected_variation: string | null
          selected_variation_index: number | null
          updated_at: string
          user_id: string
          variation_count: number
        }
        Insert: {
          created_at?: string
          custom_hashtags?: string[] | null
          generated_variations: string[]
          id?: string
          original_caption: string
          remix_platform: string
          remix_tone: string
          selected_variation?: string | null
          selected_variation_index?: number | null
          updated_at?: string
          user_id: string
          variation_count?: number
        }
        Update: {
          created_at?: string
          custom_hashtags?: string[] | null
          generated_variations?: string[]
          id?: string
          original_caption?: string
          remix_platform?: string
          remix_tone?: string
          selected_variation?: string | null
          selected_variation_index?: number | null
          updated_at?: string
          user_id?: string
          variation_count?: number
        }
        Relationships: []
      }
      caption_replays: {
        Row: {
          barber_id: string
          created_at: string
          id: string
          original_caption_id: string
          remix_caption_id: string | null
          updated_at: string
        }
        Insert: {
          barber_id: string
          created_at?: string
          id?: string
          original_caption_id: string
          remix_caption_id?: string | null
          updated_at?: string
        }
        Update: {
          barber_id?: string
          created_at?: string
          id?: string
          original_caption_id?: string
          remix_caption_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "caption_replays_original_caption_id_fkey"
            columns: ["original_caption_id"]
            isOneToOne: false
            referencedRelation: "caption_performance"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "caption_replays_remix_caption_id_fkey"
            columns: ["remix_caption_id"]
            isOneToOne: false
            referencedRelation: "caption_performance"
            referencedColumns: ["id"]
          },
        ]
      }
      caption_rewards: {
        Row: {
          auto_flex_card_id: string | null
          caption_id: string
          caption_text: string | null
          created_at: string
          earned_at: string
          evolution_notified_email: boolean | null
          evolution_notified_push: boolean | null
          evolution_notified_sms: boolean | null
          evolution_tier: number
          id: string
          payout_status: string | null
          performance_metrics: Json | null
          remix_id: string | null
          reward_amount: number
          reward_type: string
          status: string
          stripe_transfer_id: string | null
          triggered_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_flex_card_id?: string | null
          caption_id: string
          caption_text?: string | null
          created_at?: string
          earned_at?: string
          evolution_notified_email?: boolean | null
          evolution_notified_push?: boolean | null
          evolution_notified_sms?: boolean | null
          evolution_tier?: number
          id?: string
          payout_status?: string | null
          performance_metrics?: Json | null
          remix_id?: string | null
          reward_amount?: number
          reward_type?: string
          status?: string
          stripe_transfer_id?: string | null
          triggered_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_flex_card_id?: string | null
          caption_id?: string
          caption_text?: string | null
          created_at?: string
          earned_at?: string
          evolution_notified_email?: boolean | null
          evolution_notified_push?: boolean | null
          evolution_notified_sms?: boolean | null
          evolution_tier?: number
          id?: string
          payout_status?: string | null
          performance_metrics?: Json | null
          remix_id?: string | null
          reward_amount?: number
          reward_type?: string
          status?: string
          stripe_transfer_id?: string | null
          triggered_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "caption_rewards_auto_flex_card_id_fkey"
            columns: ["auto_flex_card_id"]
            isOneToOne: false
            referencedRelation: "auto_flex_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "caption_rewards_remix_id_fkey"
            columns: ["remix_id"]
            isOneToOne: false
            referencedRelation: "caption_remix_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      caption_test_events: {
        Row: {
          event_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          platform: string | null
          session_id: string | null
          test_id: string
          timestamp: string
          user_agent: string | null
          variant_id: string
        }
        Insert: {
          event_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          platform?: string | null
          session_id?: string | null
          test_id: string
          timestamp?: string
          user_agent?: string | null
          variant_id: string
        }
        Update: {
          event_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          platform?: string | null
          session_id?: string | null
          test_id?: string
          timestamp?: string
          user_agent?: string | null
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "caption_test_events_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "caption_ab_tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "caption_test_events_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "caption_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      caption_usage: {
        Row: {
          barber_id: string
          caption_text: string
          copied: boolean | null
          created_at: string
          id: string
          platform: string | null
          tone: string
          user_id: string | null
        }
        Insert: {
          barber_id: string
          caption_text: string
          copied?: boolean | null
          created_at?: string
          id?: string
          platform?: string | null
          tone: string
          user_id?: string | null
        }
        Update: {
          barber_id?: string
          caption_text?: string
          copied?: boolean | null
          created_at?: string
          id?: string
          platform?: string | null
          tone?: string
          user_id?: string | null
        }
        Relationships: []
      }
      caption_variants: {
        Row: {
          caption_text: string
          clicks: number | null
          conversion_rate: number | null
          created_at: string
          id: string
          impressions: number | null
          is_winner: boolean | null
          platform_settings: Json | null
          referrals: number | null
          shares: number | null
          test_id: string
          updated_at: string
          variant_name: string
          viral_score: number | null
        }
        Insert: {
          caption_text: string
          clicks?: number | null
          conversion_rate?: number | null
          created_at?: string
          id?: string
          impressions?: number | null
          is_winner?: boolean | null
          platform_settings?: Json | null
          referrals?: number | null
          shares?: number | null
          test_id: string
          updated_at?: string
          variant_name: string
          viral_score?: number | null
        }
        Update: {
          caption_text?: string
          clicks?: number | null
          conversion_rate?: number | null
          created_at?: string
          id?: string
          impressions?: number | null
          is_winner?: boolean | null
          platform_settings?: Json | null
          referrals?: number | null
          shares?: number | null
          test_id?: string
          updated_at?: string
          variant_name?: string
          viral_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "caption_variants_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "caption_ab_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          last_activity: string
          session_data: Json
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          last_activity?: string
          session_data?: Json
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          last_activity?: string
          session_data?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      cities: {
        Row: {
          country: string
          created_at: string
          id: string
          name: string
          slug: string
          state: string
          updated_at: string
        }
        Insert: {
          country?: string
          created_at?: string
          id?: string
          name: string
          slug: string
          state: string
          updated_at?: string
        }
        Update: {
          country?: string
          created_at?: string
          id?: string
          name?: string
          slug?: string
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      city_mood_leaderboard: {
        Row: {
          city: string
          country: string | null
          created_at: string
          current_mood: string
          id: string
          last_updated: string
          mood_score: number
          state: string | null
          total_scans: number
          total_signups: number
          trending_direction: string | null
          weekly_scans: number | null
          weekly_signups: number | null
        }
        Insert: {
          city: string
          country?: string | null
          created_at?: string
          current_mood?: string
          id?: string
          last_updated?: string
          mood_score?: number
          state?: string | null
          total_scans?: number
          total_signups?: number
          trending_direction?: string | null
          weekly_scans?: number | null
          weekly_signups?: number | null
        }
        Update: {
          city?: string
          country?: string | null
          created_at?: string
          current_mood?: string
          id?: string
          last_updated?: string
          mood_score?: number
          state?: string | null
          total_scans?: number
          total_signups?: number
          trending_direction?: string | null
          weekly_scans?: number | null
          weekly_signups?: number | null
        }
        Relationships: []
      }
      city_mood_scores: {
        Row: {
          city: string
          id: string
          last_calculated: string
          leaderboard_rank: number | null
          mood: string
          mood_emoji: string | null
          score: number
          state: string | null
          trend_direction: string
          updated_at: string
          weekly_scans: number
          weekly_signups: number
        }
        Insert: {
          city: string
          id?: string
          last_calculated?: string
          leaderboard_rank?: number | null
          mood?: string
          mood_emoji?: string | null
          score?: number
          state?: string | null
          trend_direction?: string
          updated_at?: string
          weekly_scans?: number
          weekly_signups?: number
        }
        Update: {
          city?: string
          id?: string
          last_calculated?: string
          leaderboard_rank?: number | null
          mood?: string
          mood_emoji?: string | null
          score?: number
          state?: string | null
          trend_direction?: string
          updated_at?: string
          weekly_scans?: number
          weekly_signups?: number
        }
        Relationships: []
      }
      city_posting_heatmap: {
        Row: {
          avg_ctr: number | null
          city: string
          country: string | null
          created_at: string
          date: string
          id: string
          is_underserved: boolean | null
          priority_score: number | null
          state: string | null
          top_performing_va_id: string | null
          total_posts: number | null
          total_scans: number | null
          total_signups: number | null
          total_vas: number | null
          updated_at: string
        }
        Insert: {
          avg_ctr?: number | null
          city: string
          country?: string | null
          created_at?: string
          date: string
          id?: string
          is_underserved?: boolean | null
          priority_score?: number | null
          state?: string | null
          top_performing_va_id?: string | null
          total_posts?: number | null
          total_scans?: number | null
          total_signups?: number | null
          total_vas?: number | null
          updated_at?: string
        }
        Update: {
          avg_ctr?: number | null
          city?: string
          country?: string | null
          created_at?: string
          date?: string
          id?: string
          is_underserved?: boolean | null
          priority_score?: number | null
          state?: string | null
          top_performing_va_id?: string | null
          total_posts?: number | null
          total_scans?: number | null
          total_signups?: number | null
          total_vas?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "city_posting_heatmap_top_performing_va_id_fkey"
            columns: ["top_performing_va_id"]
            isOneToOne: false
            referencedRelation: "virtual_assistants"
            referencedColumns: ["id"]
          },
        ]
      }
      city_select_logs: {
        Row: {
          city_name: string
          created_at: string
          id: string
          selection_method: string
          timestamp: string
          user_agent: string | null
          user_ip: string | null
          utm_campaign: string | null
          utm_source: string | null
        }
        Insert: {
          city_name: string
          created_at?: string
          id?: string
          selection_method?: string
          timestamp?: string
          user_agent?: string | null
          user_ip?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
        }
        Update: {
          city_name?: string
          created_at?: string
          id?: string
          selection_method?: string
          timestamp?: string
          user_agent?: string | null
          user_ip?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      city_stats: {
        Row: {
          city: string
          created_at: string
          highest_rated_job_id: string | null
          id: string
          most_applied_job_id: string | null
          state: string | null
          top_employer_id: string | null
          top_employer_name: string | null
          total_applications: number | null
          total_jobs_posted: number | null
          updated_at: string
          week_start_date: string
        }
        Insert: {
          city: string
          created_at?: string
          highest_rated_job_id?: string | null
          id?: string
          most_applied_job_id?: string | null
          state?: string | null
          top_employer_id?: string | null
          top_employer_name?: string | null
          total_applications?: number | null
          total_jobs_posted?: number | null
          updated_at?: string
          week_start_date: string
        }
        Update: {
          city?: string
          created_at?: string
          highest_rated_job_id?: string | null
          id?: string
          most_applied_job_id?: string | null
          state?: string | null
          top_employer_id?: string | null
          top_employer_name?: string | null
          total_applications?: number | null
          total_jobs_posted?: number | null
          updated_at?: string
          week_start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "city_stats_highest_rated_job_id_fkey"
            columns: ["highest_rated_job_id"]
            isOneToOne: false
            referencedRelation: "user_posted_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "city_stats_most_applied_job_id_fkey"
            columns: ["most_applied_job_id"]
            isOneToOne: false
            referencedRelation: "user_posted_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "city_stats_top_employer_id_fkey"
            columns: ["top_employer_id"]
            isOneToOne: false
            referencedRelation: "barber_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "city_stats_top_employer_id_fkey"
            columns: ["top_employer_id"]
            isOneToOne: false
            referencedRelation: "client_streak_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "city_stats_top_employer_id_fkey"
            columns: ["top_employer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      click_events: {
        Row: {
          clicked_at: string
          id: string
          ip_address: string | null
          offer_id: string
          referral_source: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          clicked_at?: string
          id?: string
          ip_address?: string | null
          offer_id: string
          referral_source?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          clicked_at?: string
          id?: string
          ip_address?: string | null
          offer_id?: string
          referral_source?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "click_events_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "monetized_offers"
            referencedColumns: ["id"]
          },
        ]
      }
      click_logs: {
        Row: {
          created_at: string
          id: string
          job_id: string
          referrer_url: string | null
          source: string
          timestamp: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          referrer_url?: string | null
          source?: string
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          referrer_url?: string | null
          source?: string
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      client_favorites: {
        Row: {
          barber_id: string
          client_id: string
          created_at: string | null
          id: string
        }
        Insert: {
          barber_id: string
          client_id: string
          created_at?: string | null
          id?: string
        }
        Update: {
          barber_id?: string
          client_id?: string
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      client_referral_payouts: {
        Row: {
          amount: number
          client_id: string
          created_at: string
          id: string
          processed_by: string | null
          reason: string
          transfer_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          client_id: string
          created_at?: string
          id?: string
          processed_by?: string | null
          reason?: string
          transfer_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          client_id?: string
          created_at?: string
          id?: string
          processed_by?: string | null
          reason?: string
          transfer_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      client_referrals: {
        Row: {
          created_at: string | null
          id: string
          referral_code: string
          referred_user_id: string | null
          referrer_client_id: string
          reward_amount: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          referral_code: string
          referred_user_id?: string | null
          referrer_client_id: string
          reward_amount?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          referral_code?: string
          referred_user_id?: string | null
          referrer_client_id?: string
          reward_amount?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      client_streaks: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          last_cut_date: string | null
          plan_id: string | null
          streak_count: number
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          last_cut_date?: string | null
          plan_id?: string | null
          streak_count?: number
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          last_cut_date?: string | null
          plan_id?: string | null
          streak_count?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_streaks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "client_appointment_patterns"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "client_streaks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_streaks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "cut_streak_leaderboard"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "client_streaks_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      client_subscriptions: {
        Row: {
          barber_id: string
          client_id: string
          created_at: string | null
          cuts_remaining: number
          id: string
          next_billing_date: string | null
          plan_id: string | null
          start_date: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          barber_id: string
          client_id: string
          created_at?: string | null
          cuts_remaining?: number
          id?: string
          next_billing_date?: string | null
          plan_id?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          barber_id?: string
          client_id?: string
          created_at?: string | null
          cuts_remaining?: number
          id?: string
          next_billing_date?: string | null
          plan_id?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "barber_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      client_tips: {
        Row: {
          amount: number
          appointment_id: string | null
          barber_id: string
          client_id: string
          created_at: string
          id: string
          message: string | null
        }
        Insert: {
          amount: number
          appointment_id?: string | null
          barber_id: string
          client_id: string
          created_at?: string
          id?: string
          message?: string | null
        }
        Update: {
          amount?: number
          appointment_id?: string | null
          barber_id?: string
          client_id?: string
          created_at?: string
          id?: string
          message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_tips_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_tips_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_tips_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "client_streak_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_tips_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_tips_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "barber_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_tips_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client_streak_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_tips_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          avatar_url: string | null
          barber_id: string
          client_status: string | null
          created_at: string
          cuts_remaining: number | null
          cuts_used_this_month: number | null
          email: string
          full_name: string
          id: string
          next_appointment_date: string | null
          phone: string | null
          shares_count: number | null
          subscription_plan_id: string | null
          subscription_start_date: string | null
          subscription_status: string | null
          total_cuts: number | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          barber_id: string
          client_status?: string | null
          created_at?: string
          cuts_remaining?: number | null
          cuts_used_this_month?: number | null
          email: string
          full_name: string
          id?: string
          next_appointment_date?: string | null
          phone?: string | null
          shares_count?: number | null
          subscription_plan_id?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          total_cuts?: number | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          barber_id?: string
          client_status?: string | null
          created_at?: string
          cuts_remaining?: number | null
          cuts_used_this_month?: number | null
          email?: string
          full_name?: string
          id?: string
          next_appointment_date?: string | null
          phone?: string | null
          shares_count?: number | null
          subscription_plan_id?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          total_cuts?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_subscription_plan_id_fkey"
            columns: ["subscription_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      coaching_leads: {
        Row: {
          applicant_name: string
          created_at: string
          email: string
          id: string
          notes: string | null
          phone: string
          preferred_contact_time: string | null
          referral_source: string | null
          status: string | null
          updated_at: string
          urgency_level: string | null
          user_id: string | null
        }
        Insert: {
          applicant_name: string
          created_at?: string
          email: string
          id?: string
          notes?: string | null
          phone: string
          preferred_contact_time?: string | null
          referral_source?: string | null
          status?: string | null
          updated_at?: string
          urgency_level?: string | null
          user_id?: string | null
        }
        Update: {
          applicant_name?: string
          created_at?: string
          email?: string
          id?: string
          notes?: string | null
          phone?: string
          preferred_contact_time?: string | null
          referral_source?: string | null
          status?: string | null
          updated_at?: string
          urgency_level?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      comment_shares: {
        Row: {
          barber_id: string | null
          comment_text: string
          created_at: string | null
          estimated_ctr: string | null
          id: string
          platform: string
          referral_code: string | null
          tone: string
          user_id: string | null
        }
        Insert: {
          barber_id?: string | null
          comment_text: string
          created_at?: string | null
          estimated_ctr?: string | null
          id?: string
          platform: string
          referral_code?: string | null
          tone: string
          user_id?: string | null
        }
        Update: {
          barber_id?: string | null
          comment_text?: string
          created_at?: string | null
          estimated_ctr?: string | null
          id?: string
          platform?: string
          referral_code?: string | null
          tone?: string
          user_id?: string | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          company_size: string | null
          created_at: string | null
          culture: string | null
          founded: number | null
          id: string
          industry: string | null
          location: string | null
          logo_url: string | null
          mission: string | null
          name: string
          perks: string[] | null
          rating: number | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          company_size?: string | null
          created_at?: string | null
          culture?: string | null
          founded?: number | null
          id?: string
          industry?: string | null
          location?: string | null
          logo_url?: string | null
          mission?: string | null
          name: string
          perks?: string[] | null
          rating?: number | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          company_size?: string | null
          created_at?: string | null
          culture?: string | null
          founded?: number | null
          id?: string
          industry?: string | null
          location?: string | null
          logo_url?: string | null
          mission?: string | null
          name?: string
          perks?: string[] | null
          rating?: number | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      company_reviews: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          rating: number | null
          review_text: string | null
          reviewer_role: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          review_text?: string | null
          reviewer_role?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          review_text?: string | null
          reviewer_role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_reviews_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_history: {
        Row: {
          created_at: string
          direction: string
          id: string
          is_ai_generated: boolean | null
          message_text: string
          phone_number: string
        }
        Insert: {
          created_at?: string
          direction: string
          id?: string
          is_ai_generated?: boolean | null
          message_text: string
          phone_number: string
        }
        Update: {
          created_at?: string
          direction?: string
          id?: string
          is_ai_generated?: boolean | null
          message_text?: string
          phone_number?: string
        }
        Relationships: []
      }
      conversion_events: {
        Row: {
          created_at: string
          event_type: string
          event_value: number | null
          id: string
          metadata: Json | null
          timestamp: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          event_value?: number | null
          id?: string
          metadata?: Json | null
          timestamp?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          event_value?: number | null
          id?: string
          metadata?: Json | null
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      cookie_attribution: {
        Row: {
          conversion_date: string | null
          converted: boolean | null
          created_at: string
          first_visit: string
          id: string
          ip_address: string | null
          landing_page: string | null
          last_visit: string
          referral_code: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visit_count: number | null
          visitor_id: string
        }
        Insert: {
          conversion_date?: string | null
          converted?: boolean | null
          created_at?: string
          first_visit?: string
          id?: string
          ip_address?: string | null
          landing_page?: string | null
          last_visit?: string
          referral_code: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visit_count?: number | null
          visitor_id: string
        }
        Update: {
          conversion_date?: string | null
          converted?: boolean | null
          created_at?: string
          first_visit?: string
          id?: string
          ip_address?: string | null
          landing_page?: string | null
          last_visit?: string
          referral_code?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visit_count?: number | null
          visitor_id?: string
        }
        Relationships: []
      }
      cover_letters: {
        Row: {
          company_name: string | null
          created_at: string
          got_response: boolean
          id: string
          is_saved: boolean
          job_id: string | null
          job_title: string
          message: string
          tone: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          got_response?: boolean
          id?: string
          is_saved?: boolean
          job_id?: string | null
          job_title: string
          message: string
          tone?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          got_response?: boolean
          id?: string
          is_saved?: boolean
          job_id?: string | null
          job_title?: string
          message?: string
          tone?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      craigslist_ab_tests: {
        Row: {
          city: string
          confidence_score: number | null
          created_at: string
          created_by_promoter_id: string | null
          end_date: string | null
          id: string
          job_type: string
          start_date: string | null
          status: string | null
          test_duration_days: number | null
          test_name: string
          total_variants: number | null
          updated_at: string
          variant_group_id: string
          winner_variant_id: string | null
        }
        Insert: {
          city: string
          confidence_score?: number | null
          created_at?: string
          created_by_promoter_id?: string | null
          end_date?: string | null
          id?: string
          job_type: string
          start_date?: string | null
          status?: string | null
          test_duration_days?: number | null
          test_name: string
          total_variants?: number | null
          updated_at?: string
          variant_group_id: string
          winner_variant_id?: string | null
        }
        Update: {
          city?: string
          confidence_score?: number | null
          created_at?: string
          created_by_promoter_id?: string | null
          end_date?: string | null
          id?: string
          job_type?: string
          start_date?: string | null
          status?: string | null
          test_duration_days?: number | null
          test_name?: string
          total_variants?: number | null
          updated_at?: string
          variant_group_id?: string
          winner_variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "craigslist_ab_tests_created_by_promoter_id_fkey"
            columns: ["created_by_promoter_id"]
            isOneToOne: false
            referencedRelation: "promoters"
            referencedColumns: ["id"]
          },
        ]
      }
      craigslist_ads: {
        Row: {
          ad_content: string
          ad_title: string
          borough: string
          business_type: string
          contact_name: string | null
          created_at: string | null
          created_by: string | null
          id: string
          phone_number: string | null
          shift_type: string
          tone: string
          variation_number: number | null
        }
        Insert: {
          ad_content: string
          ad_title: string
          borough: string
          business_type: string
          contact_name?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          phone_number?: string | null
          shift_type: string
          tone: string
          variation_number?: number | null
        }
        Update: {
          ad_content?: string
          ad_title?: string
          borough?: string
          business_type?: string
          contact_name?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          phone_number?: string | null
          shift_type?: string
          tone?: string
          variation_number?: number | null
        }
        Relationships: []
      }
      craigslist_auto_reply_settings: {
        Row: {
          created_at: string
          custom_instructions: string | null
          id: string
          is_enabled: boolean | null
          max_delay_minutes: number | null
          min_delay_minutes: number | null
          reply_tone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_instructions?: string | null
          id?: string
          is_enabled?: boolean | null
          max_delay_minutes?: number | null
          min_delay_minutes?: number | null
          reply_tone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          custom_instructions?: string | null
          id?: string
          is_enabled?: boolean | null
          max_delay_minutes?: number | null
          min_delay_minutes?: number | null
          reply_tone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      craigslist_hooks: {
        Row: {
          applications: number | null
          clicks: number | null
          created_at: string
          created_by: string | null
          hook_text: string
          id: string
          job_category: string
          performance_score: number | null
          target_audience: string
          target_city: string
        }
        Insert: {
          applications?: number | null
          clicks?: number | null
          created_at?: string
          created_by?: string | null
          hook_text: string
          id?: string
          job_category: string
          performance_score?: number | null
          target_audience: string
          target_city: string
        }
        Update: {
          applications?: number | null
          clicks?: number | null
          created_at?: string
          created_by?: string | null
          hook_text?: string
          id?: string
          job_category?: string
          performance_score?: number | null
          target_audience?: string
          target_city?: string
        }
        Relationships: []
      }
      craigslist_messages: {
        Row: {
          created_at: string
          id: string
          message_body: string
          metadata: Json | null
          phone_number: string
          received_at: string
          reply_content: string | null
          reply_sent: boolean | null
          reply_sent_at: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message_body: string
          metadata?: Json | null
          phone_number: string
          received_at?: string
          reply_content?: string | null
          reply_sent?: boolean | null
          reply_sent_at?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message_body?: string
          metadata?: Json | null
          phone_number?: string
          received_at?: string
          reply_content?: string | null
          reply_sent?: boolean | null
          reply_sent_at?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      craigslist_microsites: {
        Row: {
          city: string
          clicks: number | null
          content: string
          created_at: string
          id: string
          meta_description: string | null
          meta_keywords: string | null
          post_id: string
          slug: string
          social_image_url: string | null
          title: string
          updated_at: string
          utm_link: string | null
          views: number | null
        }
        Insert: {
          city: string
          clicks?: number | null
          content: string
          created_at?: string
          id?: string
          meta_description?: string | null
          meta_keywords?: string | null
          post_id: string
          slug: string
          social_image_url?: string | null
          title: string
          updated_at?: string
          utm_link?: string | null
          views?: number | null
        }
        Update: {
          city?: string
          clicks?: number | null
          content?: string
          created_at?: string
          id?: string
          meta_description?: string | null
          meta_keywords?: string | null
          post_id?: string
          slug?: string
          social_image_url?: string | null
          title?: string
          updated_at?: string
          utm_link?: string | null
          views?: number | null
        }
        Relationships: []
      }
      craigslist_payouts: {
        Row: {
          amount: number
          created_at: string
          id: string
          notes: string | null
          payment_details: Json | null
          payment_method: string | null
          processed_at: string | null
          processed_by: string | null
          referrer_id: string
          referrer_name: string
          requested_at: string
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          notes?: string | null
          payment_details?: Json | null
          payment_method?: string | null
          processed_at?: string | null
          processed_by?: string | null
          referrer_id: string
          referrer_name: string
          requested_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          notes?: string | null
          payment_details?: Json | null
          payment_method?: string | null
          processed_at?: string | null
          processed_by?: string | null
          referrer_id?: string
          referrer_name?: string
          requested_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      craigslist_performance_metrics: {
        Row: {
          id: string
          ip_address: string | null
          metadata: Json | null
          metric_type: string
          source: string | null
          timestamp: string
          user_agent: string | null
          value: number | null
          variant_id: string | null
        }
        Insert: {
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          metric_type: string
          source?: string | null
          timestamp?: string
          user_agent?: string | null
          value?: number | null
          variant_id?: string | null
        }
        Update: {
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          metric_type?: string
          source?: string | null
          timestamp?: string
          user_agent?: string | null
          value?: number | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "craigslist_performance_metrics_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "craigslist_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      craigslist_post_analytics: {
        Row: {
          created_at: string | null
          ctr_7day_avg: number | null
          date: string
          engagement_score: number | null
          id: string
          performance_drop_flagged: boolean | null
          post_id: string
          post_views: number | null
          updated_at: string | null
          utm_clicks: number | null
        }
        Insert: {
          created_at?: string | null
          ctr_7day_avg?: number | null
          date?: string
          engagement_score?: number | null
          id?: string
          performance_drop_flagged?: boolean | null
          post_id: string
          post_views?: number | null
          updated_at?: string | null
          utm_clicks?: number | null
        }
        Update: {
          created_at?: string | null
          ctr_7day_avg?: number | null
          date?: string
          engagement_score?: number | null
          id?: string
          performance_drop_flagged?: boolean | null
          post_id?: string
          post_views?: number | null
          updated_at?: string | null
          utm_clicks?: number | null
        }
        Relationships: []
      }
      craigslist_post_clicks: {
        Row: {
          campaign_id: string
          city: string
          clicked_at: string
          conversion_type: string | null
          converted: boolean | null
          device_type: string | null
          headline: string | null
          id: string
          ip_address: string | null
          job_type: string
          referrer_url: string | null
          session_id: string | null
          source_url: string | null
          tone: string | null
          user_agent: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          campaign_id: string
          city: string
          clicked_at?: string
          conversion_type?: string | null
          converted?: boolean | null
          device_type?: string | null
          headline?: string | null
          id?: string
          ip_address?: string | null
          job_type: string
          referrer_url?: string | null
          session_id?: string | null
          source_url?: string | null
          tone?: string | null
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          campaign_id?: string
          city?: string
          clicked_at?: string
          conversion_type?: string | null
          converted?: boolean | null
          device_type?: string | null
          headline?: string | null
          id?: string
          ip_address?: string | null
          job_type?: string
          referrer_url?: string | null
          session_id?: string | null
          source_url?: string | null
          tone?: string | null
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      craigslist_posts: {
        Row: {
          active: boolean | null
          applications: number | null
          auto_generated: boolean | null
          auto_repost: boolean | null
          body: string | null
          borough: string | null
          city_code: string | null
          clicks: number | null
          conversion_score: number | null
          craigslist_url: string | null
          created_at: string
          daily_variant_id: string | null
          fatigue_flagged: boolean | null
          flag_risk_score: number | null
          flagged: boolean | null
          id: string
          job_type: string | null
          last_repost_at: string | null
          last_reposted_at: string | null
          manual_posted: boolean | null
          messages_received: number | null
          next_repost_date: string | null
          performance_score: number | null
          post_id: string | null
          posted_at: string
          posted_date: string | null
          repost_count: number | null
          repost_frequency_days: number | null
          test_id: string | null
          title: string | null
          updated_at: string
          used: boolean | null
          utm_link: string | null
          variant: string
          variant_score: number | null
          views_count: number | null
          views_estimated: number | null
        }
        Insert: {
          active?: boolean | null
          applications?: number | null
          auto_generated?: boolean | null
          auto_repost?: boolean | null
          body?: string | null
          borough?: string | null
          city_code?: string | null
          clicks?: number | null
          conversion_score?: number | null
          craigslist_url?: string | null
          created_at?: string
          daily_variant_id?: string | null
          fatigue_flagged?: boolean | null
          flag_risk_score?: number | null
          flagged?: boolean | null
          id?: string
          job_type?: string | null
          last_repost_at?: string | null
          last_reposted_at?: string | null
          manual_posted?: boolean | null
          messages_received?: number | null
          next_repost_date?: string | null
          performance_score?: number | null
          post_id?: string | null
          posted_at?: string
          posted_date?: string | null
          repost_count?: number | null
          repost_frequency_days?: number | null
          test_id?: string | null
          title?: string | null
          updated_at?: string
          used?: boolean | null
          utm_link?: string | null
          variant: string
          variant_score?: number | null
          views_count?: number | null
          views_estimated?: number | null
        }
        Update: {
          active?: boolean | null
          applications?: number | null
          auto_generated?: boolean | null
          auto_repost?: boolean | null
          body?: string | null
          borough?: string | null
          city_code?: string | null
          clicks?: number | null
          conversion_score?: number | null
          craigslist_url?: string | null
          created_at?: string
          daily_variant_id?: string | null
          fatigue_flagged?: boolean | null
          flag_risk_score?: number | null
          flagged?: boolean | null
          id?: string
          job_type?: string | null
          last_repost_at?: string | null
          last_reposted_at?: string | null
          manual_posted?: boolean | null
          messages_received?: number | null
          next_repost_date?: string | null
          performance_score?: number | null
          post_id?: string | null
          posted_at?: string
          posted_date?: string | null
          repost_count?: number | null
          repost_frequency_days?: number | null
          test_id?: string | null
          title?: string | null
          updated_at?: string
          used?: boolean | null
          utm_link?: string | null
          variant?: string
          variant_score?: number | null
          views_count?: number | null
          views_estimated?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "craigslist_posts_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "craigslist_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      craigslist_referral_clicks: {
        Row: {
          click_id: string
          converted: boolean | null
          created_at: string
          id: string
          ip_address: string | null
          post_id: string | null
          referral_code: string
          session_id: string | null
          timestamp: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          click_id: string
          converted?: boolean | null
          created_at?: string
          id?: string
          ip_address?: string | null
          post_id?: string | null
          referral_code: string
          session_id?: string | null
          timestamp?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          click_id?: string
          converted?: boolean | null
          created_at?: string
          id?: string
          ip_address?: string | null
          post_id?: string | null
          referral_code?: string
          session_id?: string | null
          timestamp?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      craigslist_referrals: {
        Row: {
          conversions: number
          created_at: string
          id: string
          payout_earned: number
          referral_code: string
          referrer_name: string
          total_clicks: number
          unique_clicks: number
          updated_at: string
        }
        Insert: {
          conversions?: number
          created_at?: string
          id?: string
          payout_earned?: number
          referral_code: string
          referrer_name: string
          total_clicks?: number
          unique_clicks?: number
          updated_at?: string
        }
        Update: {
          conversions?: number
          created_at?: string
          id?: string
          payout_earned?: number
          referral_code?: string
          referrer_name?: string
          total_clicks?: number
          unique_clicks?: number
          updated_at?: string
        }
        Relationships: []
      }
      craigslist_rotation_log: {
        Row: {
          action_taken: string
          city: string
          created_at: string
          id: string
          job_type: string
          performance_data: Json | null
          reason: string | null
          rotation_date: string
          variant_id: string | null
        }
        Insert: {
          action_taken: string
          city: string
          created_at?: string
          id?: string
          job_type: string
          performance_data?: Json | null
          reason?: string | null
          rotation_date?: string
          variant_id?: string | null
        }
        Update: {
          action_taken?: string
          city?: string
          created_at?: string
          id?: string
          job_type?: string
          performance_data?: Json | null
          reason?: string | null
          rotation_date?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "craigslist_rotation_log_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "craigslist_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      craigslist_split_tests: {
        Row: {
          a_clicks: number
          b_clicks: number
          city: string
          created_at: string
          id: string
          job_type: string
          status: string
          test_name: string
          updated_at: string
          variant_a_body: string
          variant_a_title: string
          variant_b_body: string
          variant_b_title: string
          winner: string | null
        }
        Insert: {
          a_clicks?: number
          b_clicks?: number
          city: string
          created_at?: string
          id?: string
          job_type: string
          status?: string
          test_name: string
          updated_at?: string
          variant_a_body: string
          variant_a_title: string
          variant_b_body: string
          variant_b_title: string
          winner?: string | null
        }
        Update: {
          a_clicks?: number
          b_clicks?: number
          city?: string
          created_at?: string
          id?: string
          job_type?: string
          status?: string
          test_name?: string
          updated_at?: string
          variant_a_body?: string
          variant_a_title?: string
          variant_b_body?: string
          variant_b_title?: string
          winner?: string | null
        }
        Relationships: []
      }
      craigslist_tests: {
        Row: {
          a_applications: number | null
          a_clicks: number | null
          b_applications: number | null
          b_clicks: number | null
          city: string
          confidence_score: number | null
          created_at: string
          created_by: string | null
          end_date: string | null
          id: string
          job_type: string
          start_date: string
          test_status: string | null
          updated_at: string
          variant_a: Json
          variant_b: Json
          winner: string | null
        }
        Insert: {
          a_applications?: number | null
          a_clicks?: number | null
          b_applications?: number | null
          b_clicks?: number | null
          city: string
          confidence_score?: number | null
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          job_type: string
          start_date?: string
          test_status?: string | null
          updated_at?: string
          variant_a: Json
          variant_b: Json
          winner?: string | null
        }
        Update: {
          a_applications?: number | null
          a_clicks?: number | null
          b_applications?: number | null
          b_clicks?: number | null
          city?: string
          confidence_score?: number | null
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          job_type?: string
          start_date?: string
          test_status?: string | null
          updated_at?: string
          variant_a?: Json
          variant_b?: Json
          winner?: string | null
        }
        Relationships: []
      }
      craigslist_variants: {
        Row: {
          body: string
          city: string
          click_count: number | null
          created_at: string
          created_by_promoter_id: string | null
          ctr_percentage: number | null
          expires_at: string | null
          headline: string
          id: string
          is_active: boolean | null
          is_flagged: boolean | null
          job_type: string
          last_posted_at: string | null
          metadata: Json | null
          performance_score: number | null
          reply_count: number | null
          scan_count: number | null
          tone: string
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          variant_group_id: string
          view_count: number | null
        }
        Insert: {
          body: string
          city: string
          click_count?: number | null
          created_at?: string
          created_by_promoter_id?: string | null
          ctr_percentage?: number | null
          expires_at?: string | null
          headline: string
          id?: string
          is_active?: boolean | null
          is_flagged?: boolean | null
          job_type: string
          last_posted_at?: string | null
          metadata?: Json | null
          performance_score?: number | null
          reply_count?: number | null
          scan_count?: number | null
          tone: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          variant_group_id: string
          view_count?: number | null
        }
        Update: {
          body?: string
          city?: string
          click_count?: number | null
          created_at?: string
          created_by_promoter_id?: string | null
          ctr_percentage?: number | null
          expires_at?: string | null
          headline?: string
          id?: string
          is_active?: boolean | null
          is_flagged?: boolean | null
          job_type?: string
          last_posted_at?: string | null
          metadata?: Json | null
          performance_score?: number | null
          reply_count?: number | null
          scan_count?: number | null
          tone?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          variant_group_id?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "craigslist_variants_created_by_promoter_id_fkey"
            columns: ["created_by_promoter_id"]
            isOneToOne: false
            referencedRelation: "promoters"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_clicks: {
        Row: {
          affiliate_link: string
          click_timestamp: string
          creator_ref_id: string
          device_info: Json | null
          fraud_score: number | null
          id: string
          ip_address: string | null
          is_valid: boolean | null
          origin_platform: string | null
          product_id: string
          referrer_url: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          affiliate_link: string
          click_timestamp?: string
          creator_ref_id: string
          device_info?: Json | null
          fraud_score?: number | null
          id?: string
          ip_address?: string | null
          is_valid?: boolean | null
          origin_platform?: string | null
          product_id: string
          referrer_url?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          affiliate_link?: string
          click_timestamp?: string
          creator_ref_id?: string
          device_info?: Json | null
          fraud_score?: number | null
          id?: string
          ip_address?: string | null
          is_valid?: boolean | null
          origin_platform?: string | null
          product_id?: string
          referrer_url?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      creator_earnings: {
        Row: {
          created_at: string | null
          creator_user_id: string
          id: string
          marketplace_earnings: number | null
          pending_payout: number | null
          referral_earnings: number | null
          total_earned: number | null
          total_sales_count: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_user_id: string
          id?: string
          marketplace_earnings?: number | null
          pending_payout?: number | null
          referral_earnings?: number | null
          total_earned?: number | null
          total_sales_count?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_user_id?: string
          id?: string
          marketplace_earnings?: number | null
          pending_payout?: number | null
          referral_earnings?: number | null
          total_earned?: number | null
          total_sales_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      creator_handles: {
        Row: {
          created_at: string | null
          handle: string
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          handle: string
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          handle?: string
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      creator_marketplace_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          is_verified: boolean | null
          rating: number | null
          total_prompts: number | null
          total_sales: number | null
          twitter_handle: string | null
          updated_at: string
          user_id: string | null
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_verified?: boolean | null
          rating?: number | null
          total_prompts?: number | null
          total_sales?: number | null
          twitter_handle?: string | null
          updated_at?: string
          user_id?: string | null
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_verified?: boolean | null
          rating?: number | null
          total_prompts?: number | null
          total_sales?: number | null
          twitter_handle?: string | null
          updated_at?: string
          user_id?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      creator_payouts: {
        Row: {
          admin_notes: string | null
          amount: number
          creator_id: string
          id: string
          payout_email: string
          payout_method: string
          processed_date: string | null
          request_date: string
          status: string
          transaction_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          creator_id: string
          id?: string
          payout_email: string
          payout_method?: string
          processed_date?: string | null
          request_date?: string
          status?: string
          transaction_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          creator_id?: string
          id?: string
          payout_email?: string
          payout_method?: string
          processed_date?: string | null
          request_date?: string
          status?: string
          transaction_id?: string | null
        }
        Relationships: []
      }
      creator_profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          mood_status: string | null
          name: string
          payout_method: string
          platform: string | null
          ref_code: string
          ref_source: string | null
          social_handle: string | null
          stripe_account_id: string | null
          tier: string | null
          total_clicks: number | null
          total_earnings: number | null
          total_signups: number | null
          updated_at: string
          user_id: string
          utm_campaign: string | null
          utm_medium: string | null
          viral_score: number | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          mood_status?: string | null
          name: string
          payout_method?: string
          platform?: string | null
          ref_code: string
          ref_source?: string | null
          social_handle?: string | null
          stripe_account_id?: string | null
          tier?: string | null
          total_clicks?: number | null
          total_earnings?: number | null
          total_signups?: number | null
          updated_at?: string
          user_id: string
          utm_campaign?: string | null
          utm_medium?: string | null
          viral_score?: number | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          mood_status?: string | null
          name?: string
          payout_method?: string
          platform?: string | null
          ref_code?: string
          ref_source?: string | null
          social_handle?: string | null
          stripe_account_id?: string | null
          tier?: string | null
          total_clicks?: number | null
          total_earnings?: number | null
          total_signups?: number | null
          updated_at?: string
          user_id?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          viral_score?: number | null
        }
        Relationships: []
      }
      creator_referrals: {
        Row: {
          created_at: string | null
          earnings_awarded: number | null
          id: string
          referral_code: string
          referred_user_id: string | null
          referrer_user_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          earnings_awarded?: number | null
          id?: string
          referral_code: string
          referred_user_id?: string | null
          referrer_user_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          earnings_awarded?: number | null
          id?: string
          referral_code?: string
          referred_user_id?: string | null
          referrer_user_id?: string | null
          status?: string | null
        }
        Relationships: []
      }
      creator_shortlinks: {
        Row: {
          click_count: number | null
          created_at: string
          creator_id: string
          id: string
          is_active: boolean | null
          original_url: string
          short_code: string
          title: string | null
        }
        Insert: {
          click_count?: number | null
          created_at?: string
          creator_id: string
          id?: string
          is_active?: boolean | null
          original_url: string
          short_code: string
          title?: string | null
        }
        Update: {
          click_count?: number | null
          created_at?: string
          creator_id?: string
          id?: string
          is_active?: boolean | null
          original_url?: string
          short_code?: string
          title?: string | null
        }
        Relationships: []
      }
      creator_videos: {
        Row: {
          admin_notes: string | null
          created_at: string
          description: string | null
          earnings_usd: number | null
          engagement_ratio: number | null
          fraud_score: number | null
          gpt_confidence_score: number | null
          id: string
          last_verified_at: string | null
          mentions_find: boolean | null
          payout_status: string
          platform: string
          status: string
          transcript_excerpt: string | null
          updated_at: string
          user_id: string
          verified_views: number | null
          video_id: string
          video_url: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          description?: string | null
          earnings_usd?: number | null
          engagement_ratio?: number | null
          fraud_score?: number | null
          gpt_confidence_score?: number | null
          id?: string
          last_verified_at?: string | null
          mentions_find?: boolean | null
          payout_status?: string
          platform: string
          status?: string
          transcript_excerpt?: string | null
          updated_at?: string
          user_id: string
          verified_views?: number | null
          video_id: string
          video_url: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          description?: string | null
          earnings_usd?: number | null
          engagement_ratio?: number | null
          fraud_score?: number | null
          gpt_confidence_score?: number | null
          id?: string
          last_verified_at?: string | null
          mentions_find?: boolean | null
          payout_status?: string
          platform?: string
          status?: string
          transcript_excerpt?: string | null
          updated_at?: string
          user_id?: string
          verified_views?: number | null
          video_id?: string
          video_url?: string
        }
        Relationships: []
      }
      creator_views: {
        Row: {
          comment_count: number | null
          creator_ref_id: string
          ctr_rate: number | null
          earnings_attributed: number | null
          id: string
          is_approved: boolean | null
          last_verified: string | null
          like_count: number | null
          platform: string
          user_id: string | null
          video_id: string
          video_url: string | null
          view_count: number | null
        }
        Insert: {
          comment_count?: number | null
          creator_ref_id: string
          ctr_rate?: number | null
          earnings_attributed?: number | null
          id?: string
          is_approved?: boolean | null
          last_verified?: string | null
          like_count?: number | null
          platform: string
          user_id?: string | null
          video_id: string
          video_url?: string | null
          view_count?: number | null
        }
        Update: {
          comment_count?: number | null
          creator_ref_id?: string
          ctr_rate?: number | null
          earnings_attributed?: number | null
          id?: string
          is_approved?: boolean | null
          last_verified?: string | null
          like_count?: number | null
          platform?: string
          user_id?: string | null
          video_id?: string
          video_url?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      creator_wallets: {
        Row: {
          balance: number
          created_at: string
          id: string
          last_updated: string
          lifetime_earnings: number
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          last_updated?: string
          lifetime_earnings?: number
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          last_updated?: string
          lifetime_earnings?: number
          user_id?: string
        }
        Relationships: []
      }
      creator_withdrawals: {
        Row: {
          admin_notes: string | null
          amount: number
          id: string
          method: string
          payout_details: Json | null
          payout_email: string | null
          processed_at: string | null
          requested_at: string
          status: string
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          id?: string
          method?: string
          payout_details?: Json | null
          payout_email?: string | null
          processed_at?: string | null
          requested_at?: string
          status?: string
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          id?: string
          method?: string
          payout_details?: Json | null
          payout_email?: string | null
          processed_at?: string | null
          requested_at?: string
          status?: string
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      credits_history: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          reference_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      crm_leads: {
        Row: {
          assigned_to: string | null
          city: string | null
          created_at: string
          email: string | null
          follow_up_date: string | null
          id: string
          job_type: string | null
          metadata: Json | null
          name: string | null
          notes: string | null
          phone: string | null
          source_id: string
          source_type: string
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          follow_up_date?: string | null
          id?: string
          job_type?: string | null
          metadata?: Json | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          source_id: string
          source_type: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          follow_up_date?: string | null
          id?: string
          job_type?: string | null
          metadata?: Json | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          source_id?: string
          source_type?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      cut_reviews: {
        Row: {
          appointment_id: string | null
          barber_id: string
          client_id: string
          created_at: string
          gpt_review: string
          id: string
          rating: number
          review_style: string
        }
        Insert: {
          appointment_id?: string | null
          barber_id: string
          client_id: string
          created_at?: string
          gpt_review: string
          id?: string
          rating: number
          review_style?: string
        }
        Update: {
          appointment_id?: string | null
          barber_id?: string
          client_id?: string
          created_at?: string
          gpt_review?: string
          id?: string
          rating?: number
          review_style?: string
        }
        Relationships: [
          {
            foreignKeyName: "cut_reviews_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      cut_sessions: {
        Row: {
          barber_id: string
          client_id: string
          created_at: string
          id: string
          notes: string | null
          payout_amount: number
          session_date: string
          stripe_payout_id: string | null
        }
        Insert: {
          barber_id: string
          client_id: string
          created_at?: string
          id?: string
          notes?: string | null
          payout_amount: number
          session_date?: string
          stripe_payout_id?: string | null
        }
        Update: {
          barber_id?: string
          client_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          payout_amount?: number
          session_date?: string
          stripe_payout_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cut_sessions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "cut_sessions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cut_sessions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "cut_sessions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "cut_sessions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "cut_sessions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client_appointment_patterns"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "cut_sessions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cut_sessions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "cut_streak_leaderboard"
            referencedColumns: ["client_id"]
          },
        ]
      }
      cut_streaks: {
        Row: {
          barber_id: string
          created_at: string
          current_streak: number
          highest_streak: number
          id: string
          last_cut_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          barber_id: string
          created_at?: string
          current_streak?: number
          highest_streak?: number
          id?: string
          last_cut_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          barber_id?: string
          created_at?: string
          current_streak?: number
          highest_streak?: number
          id?: string
          last_cut_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      cut_uploads: {
        Row: {
          analysis_tags: Json | null
          confidence_score: number | null
          created_at: string | null
          cut_type: string | null
          id: string
          image_url: string
          style_description: string | null
          user_id: string | null
        }
        Insert: {
          analysis_tags?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          cut_type?: string | null
          id?: string
          image_url: string
          style_description?: string | null
          user_id?: string | null
        }
        Update: {
          analysis_tags?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          cut_type?: string | null
          id?: string
          image_url?: string
          style_description?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      daily_alert_logs: {
        Row: {
          created_at: string | null
          delivered_at: string | null
          delivery_method: string
          error_message: string | null
          id: string
          jobs_sent: string[] | null
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          delivered_at?: string | null
          delivery_method: string
          error_message?: string | null
          id?: string
          jobs_sent?: string[] | null
          status: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          delivered_at?: string | null
          delivery_method?: string
          error_message?: string | null
          id?: string
          jobs_sent?: string[] | null
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      daily_feed_recommendations: {
        Row: {
          applied_count: number | null
          created_at: string
          generation_date: string
          id: string
          match_reasoning: string | null
          recommended_jobs: Json
          total_recommendations: number | null
          updated_at: string
          user_id: string
          user_preferences: Json | null
        }
        Insert: {
          applied_count?: number | null
          created_at?: string
          generation_date?: string
          id?: string
          match_reasoning?: string | null
          recommended_jobs?: Json
          total_recommendations?: number | null
          updated_at?: string
          user_id: string
          user_preferences?: Json | null
        }
        Update: {
          applied_count?: number | null
          created_at?: string
          generation_date?: string
          id?: string
          match_reasoning?: string | null
          recommended_jobs?: Json
          total_recommendations?: number | null
          updated_at?: string
          user_id?: string
          user_preferences?: Json | null
        }
        Relationships: []
      }
      daily_job_highlights: {
        Row: {
          created_at: string
          highlight_date: string
          id: string
          is_active: boolean | null
          job_id: string
          reason: string | null
        }
        Insert: {
          created_at?: string
          highlight_date?: string
          id?: string
          is_active?: boolean | null
          job_id: string
          reason?: string | null
        }
        Update: {
          created_at?: string
          highlight_date?: string
          id?: string
          is_active?: boolean | null
          job_id?: string
          reason?: string | null
        }
        Relationships: []
      }
      daily_recap_logs: {
        Row: {
          created_at: string
          id: string
          jobs_count: number
          recipients_count: number
          send_date: string
          sms_sent_count: number
        }
        Insert: {
          created_at?: string
          id?: string
          jobs_count: number
          recipients_count: number
          send_date: string
          sms_sent_count: number
        }
        Update: {
          created_at?: string
          id?: string
          jobs_count?: number
          recipients_count?: number
          send_date?: string
          sms_sent_count?: number
        }
        Relationships: []
      }
      deals_tracker: {
        Row: {
          created_at: string
          deal_price: number
          deal_tags: string[] | null
          deal_type: string
          discount_percentage: number | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          original_price: number | null
          product_id: string
          supplier: string
        }
        Insert: {
          created_at?: string
          deal_price: number
          deal_tags?: string[] | null
          deal_type: string
          discount_percentage?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          original_price?: number | null
          product_id: string
          supplier: string
        }
        Update: {
          created_at?: string
          deal_price?: number
          deal_tags?: string[] | null
          deal_type?: string
          discount_percentage?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          original_price?: number | null
          product_id?: string
          supplier?: string
        }
        Relationships: []
      }
      email_drip_logs: {
        Row: {
          clicked_at: string | null
          drip_sequence: number
          email: string
          email_type: string
          id: string
          metadata: Json | null
          opened_at: string | null
          sent_at: string | null
          status: string | null
          unsubscribed_at: string | null
          user_id: string | null
        }
        Insert: {
          clicked_at?: string | null
          drip_sequence: number
          email: string
          email_type: string
          id?: string
          metadata?: Json | null
          opened_at?: string | null
          sent_at?: string | null
          status?: string | null
          unsubscribed_at?: string | null
          user_id?: string | null
        }
        Update: {
          clicked_at?: string | null
          drip_sequence?: number
          email?: string
          email_type?: string
          id?: string
          metadata?: Json | null
          opened_at?: string | null
          sent_at?: string | null
          status?: string | null
          unsubscribed_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          content: string | null
          email_type: string
          error_message: string | null
          external_message_id: string | null
          id: string
          recipient_email: string
          sent_at: string
          status: string | null
          subject: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          email_type: string
          error_message?: string | null
          external_message_id?: string | null
          id?: string
          recipient_email: string
          sent_at?: string
          status?: string | null
          subject?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          email_type?: string
          error_message?: string | null
          external_message_id?: string | null
          id?: string
          recipient_email?: string
          sent_at?: string
          status?: string | null
          subject?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      employer_impact_stats: {
        Row: {
          application_to_hire_rate: number | null
          avg_match_score: number | null
          avg_time_to_first_application: number | null
          created_at: string
          employer_id: string
          id: string
          period_end: string
          period_start: string
          total_applicants: number | null
          updated_at: string
          video_resumes_submitted: number | null
        }
        Insert: {
          application_to_hire_rate?: number | null
          avg_match_score?: number | null
          avg_time_to_first_application?: number | null
          created_at?: string
          employer_id: string
          id?: string
          period_end: string
          period_start: string
          total_applicants?: number | null
          updated_at?: string
          video_resumes_submitted?: number | null
        }
        Update: {
          application_to_hire_rate?: number | null
          avg_match_score?: number | null
          avg_time_to_first_application?: number | null
          created_at?: string
          employer_id?: string
          id?: string
          period_end?: string
          period_start?: string
          total_applicants?: number | null
          updated_at?: string
          video_resumes_submitted?: number | null
        }
        Relationships: []
      }
      employer_leads: {
        Row: {
          city: string
          company: string | null
          created_at: string | null
          email: string
          id: string
          job_type: string | null
          name: string
          payment_status: string | null
          phone: string | null
          status: string | null
          stripe_customer_id: string | null
          stripe_session_id: string | null
          updated_at: string | null
        }
        Insert: {
          city: string
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          job_type?: string | null
          name: string
          payment_status?: string | null
          phone?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
        }
        Update: {
          city?: string
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          job_type?: string | null
          name?: string
          payment_status?: string | null
          phone?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      employer_posts: {
        Row: {
          alert_reach: number | null
          applicants: number | null
          avg_lead_score: number | null
          created_at: string
          first_response_minutes: number | null
          id: string
          job_id: string
          posted_at: string
          title: string
          updated_at: string
        }
        Insert: {
          alert_reach?: number | null
          applicants?: number | null
          avg_lead_score?: number | null
          created_at?: string
          first_response_minutes?: number | null
          id?: string
          job_id: string
          posted_at?: string
          title: string
          updated_at?: string
        }
        Update: {
          alert_reach?: number | null
          applicants?: number | null
          avg_lead_score?: number | null
          created_at?: string
          first_response_minutes?: number | null
          id?: string
          job_id?: string
          posted_at?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      employer_reports: {
        Row: {
          created_at: string
          email_sent: boolean | null
          email_sent_at: string | null
          employer_id: string | null
          id: string
          report_data: Json | null
          top_match_applicant_id: string | null
          top_match_score: number | null
          total_applicants: number | null
          total_reposts: number | null
          total_views: number | null
          week_end: string
          week_start: string
        }
        Insert: {
          created_at?: string
          email_sent?: boolean | null
          email_sent_at?: string | null
          employer_id?: string | null
          id?: string
          report_data?: Json | null
          top_match_applicant_id?: string | null
          top_match_score?: number | null
          total_applicants?: number | null
          total_reposts?: number | null
          total_views?: number | null
          week_end: string
          week_start: string
        }
        Update: {
          created_at?: string
          email_sent?: boolean | null
          email_sent_at?: string | null
          employer_id?: string | null
          id?: string
          report_data?: Json | null
          top_match_applicant_id?: string | null
          top_match_score?: number | null
          total_applicants?: number | null
          total_reposts?: number | null
          total_views?: number | null
          week_end?: string
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_reports_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_reports_top_match_applicant_id_fkey"
            columns: ["top_match_applicant_id"]
            isOneToOne: false
            referencedRelation: "applicants"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_settings: {
        Row: {
          created_at: string
          id: string
          notification_method: string | null
          receive_daily_report: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notification_method?: string | null
          receive_daily_report?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notification_method?: string | null
          receive_daily_report?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      employers: {
        Row: {
          borough: string
          business_name: string
          contact_email: string
          contact_name: string
          contact_phone: string | null
          created_at: string
          id: string
          industry: string
          logo_url: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          borough: string
          business_name: string
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          created_at?: string
          id?: string
          industry: string
          logo_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          borough?: string
          business_name?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          created_at?: string
          id?: string
          industry?: string
          logo_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      error_logs: {
        Row: {
          api_endpoint: string | null
          created_at: string
          error_message: string
          error_type: string
          id: string
          request_data: Json | null
          stack_trace: string | null
          user_id: string | null
        }
        Insert: {
          api_endpoint?: string | null
          created_at?: string
          error_message: string
          error_type: string
          id?: string
          request_data?: Json | null
          stack_trace?: string | null
          user_id?: string | null
        }
        Update: {
          api_endpoint?: string | null
          created_at?: string
          error_message?: string
          error_type?: string
          id?: string
          request_data?: Json | null
          stack_trace?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      facebook_partners: {
        Row: {
          city: string
          contact_email: string | null
          contact_person: string | null
          created_at: string
          created_by_admin_id: string | null
          group_name: string
          id: string
          last_engaged: string | null
          notes: string | null
          outreach_message: string | null
          reach_estimate: number | null
          status: string | null
          updated_at: string
        }
        Insert: {
          city: string
          contact_email?: string | null
          contact_person?: string | null
          created_at?: string
          created_by_admin_id?: string | null
          group_name: string
          id?: string
          last_engaged?: string | null
          notes?: string | null
          outreach_message?: string | null
          reach_estimate?: number | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          city?: string
          contact_email?: string | null
          contact_person?: string | null
          created_at?: string
          created_by_admin_id?: string | null
          group_name?: string
          id?: string
          last_engaged?: string | null
          notes?: string | null
          outreach_message?: string | null
          reach_estimate?: number | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      fake_jobs: {
        Row: {
          ai_match_score: number | null
          city: string
          company_name: string
          created_at: string | null
          description: string | null
          description_snippet: string | null
          id: string
          is_hot: boolean | null
          is_verified: boolean | null
          job_title: string
          quick_badge: string | null
          salary_range: string | null
          state: string | null
          tags: string[] | null
          type: string
        }
        Insert: {
          ai_match_score?: number | null
          city: string
          company_name: string
          created_at?: string | null
          description?: string | null
          description_snippet?: string | null
          id?: string
          is_hot?: boolean | null
          is_verified?: boolean | null
          job_title: string
          quick_badge?: string | null
          salary_range?: string | null
          state?: string | null
          tags?: string[] | null
          type?: string
        }
        Update: {
          ai_match_score?: number | null
          city?: string
          company_name?: string
          created_at?: string | null
          description?: string | null
          description_snippet?: string | null
          id?: string
          is_hot?: boolean | null
          is_verified?: boolean | null
          job_title?: string
          quick_badge?: string | null
          salary_range?: string | null
          state?: string | null
          tags?: string[] | null
          type?: string
        }
        Relationships: []
      }
      flyer_ab_tests: {
        Row: {
          city: string
          conversion_rate: number
          conversions: number
          created_at: string
          ctr: number
          flyer_content: string | null
          headline: string
          id: string
          is_active: boolean
          job_type: string
          scans: number
          test_id: string
          time_on_page: number
          updated_at: string
          utm_campaign: string | null
          variant_type: string
          views: number
        }
        Insert: {
          city: string
          conversion_rate?: number
          conversions?: number
          created_at?: string
          ctr?: number
          flyer_content?: string | null
          headline: string
          id?: string
          is_active?: boolean
          job_type: string
          scans?: number
          test_id: string
          time_on_page?: number
          updated_at?: string
          utm_campaign?: string | null
          variant_type: string
          views?: number
        }
        Update: {
          city?: string
          conversion_rate?: number
          conversions?: number
          created_at?: string
          ctr?: number
          flyer_content?: string | null
          headline?: string
          id?: string
          is_active?: boolean
          job_type?: string
          scans?: number
          test_id?: string
          time_on_page?: number
          updated_at?: string
          utm_campaign?: string | null
          variant_type?: string
          views?: number
        }
        Relationships: []
      }
      flyer_activity: {
        Row: {
          barber_id: string
          created_at: string
          download_count: number | null
          flyer_type: string | null
          id: string
          ref_code: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          barber_id: string
          created_at?: string
          download_count?: number | null
          flyer_type?: string | null
          id?: string
          ref_code?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          barber_id?: string
          created_at?: string
          download_count?: number | null
          flyer_type?: string | null
          id?: string
          ref_code?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      flyer_campaigns: {
        Row: {
          bonus_amount: number | null
          bonus_type: string | null
          bulk_campaign_id: string | null
          city: string
          created_at: string
          created_by_promoter_id: string | null
          destination_url: string | null
          flyer_design_url: string | null
          id: string
          is_active: boolean | null
          job_type: string
          language: string
          qr_code_url: string | null
          style: string
          title: string
          total_conversions: number | null
          total_scans: number | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          bonus_amount?: number | null
          bonus_type?: string | null
          bulk_campaign_id?: string | null
          city: string
          created_at?: string
          created_by_promoter_id?: string | null
          destination_url?: string | null
          flyer_design_url?: string | null
          id?: string
          is_active?: boolean | null
          job_type: string
          language?: string
          qr_code_url?: string | null
          style?: string
          title: string
          total_conversions?: number | null
          total_scans?: number | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          bonus_amount?: number | null
          bonus_type?: string | null
          bulk_campaign_id?: string | null
          city?: string
          created_at?: string
          created_by_promoter_id?: string | null
          destination_url?: string | null
          flyer_design_url?: string | null
          id?: string
          is_active?: boolean | null
          job_type?: string
          language?: string
          qr_code_url?: string | null
          style?: string
          title?: string
          total_conversions?: number | null
          total_scans?: number | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      flyer_exports: {
        Row: {
          caption: string | null
          city: string
          created_at: string
          cta_click_count: number
          download_count: number
          flyer_url: string | null
          id: string
          job_type: string
          language: string
          qr_code_url: string | null
          scan_count: number
          updated_at: string
          viral_score: number | null
        }
        Insert: {
          caption?: string | null
          city: string
          created_at?: string
          cta_click_count?: number
          download_count?: number
          flyer_url?: string | null
          id?: string
          job_type: string
          language?: string
          qr_code_url?: string | null
          scan_count?: number
          updated_at?: string
          viral_score?: number | null
        }
        Update: {
          caption?: string | null
          city?: string
          created_at?: string
          cta_click_count?: number
          download_count?: number
          flyer_url?: string | null
          id?: string
          job_type?: string
          language?: string
          qr_code_url?: string | null
          scan_count?: number
          updated_at?: string
          viral_score?: number | null
        }
        Relationships: []
      }
      flyer_posting_insights: {
        Row: {
          created_at: string
          ctr_rate: number | null
          day_of_week: string
          flyer_id: string | null
          id: string
          location_posted: string
          poster_user_id: string | null
          resulting_clicks: number
          resulting_signups: number
          time_of_day: string
          time_posted: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          ctr_rate?: number | null
          day_of_week: string
          flyer_id?: string | null
          id?: string
          location_posted: string
          poster_user_id?: string | null
          resulting_clicks?: number
          resulting_signups?: number
          time_of_day: string
          time_posted?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          ctr_rate?: number | null
          day_of_week?: string
          flyer_id?: string | null
          id?: string
          location_posted?: string
          poster_user_id?: string | null
          resulting_clicks?: number
          resulting_signups?: number
          time_of_day?: string
          time_posted?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flyer_posting_insights_flyer_id_fkey"
            columns: ["flyer_id"]
            isOneToOne: false
            referencedRelation: "flyer_exports"
            referencedColumns: ["id"]
          },
        ]
      }
      flyer_qr_scans: {
        Row: {
          conversion_type: string | null
          converted: boolean | null
          flyer_campaign_id: string
          id: string
          ip_address: string | null
          location_data: Json | null
          referrer_url: string | null
          scanned_at: string
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          conversion_type?: string | null
          converted?: boolean | null
          flyer_campaign_id: string
          id?: string
          ip_address?: string | null
          location_data?: Json | null
          referrer_url?: string | null
          scanned_at?: string
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          conversion_type?: string | null
          converted?: boolean | null
          flyer_campaign_id?: string
          id?: string
          ip_address?: string | null
          location_data?: Json | null
          referrer_url?: string | null
          scanned_at?: string
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      follow_ups: {
        Row: {
          application_log_id: string | null
          created_at: string
          follow_up_message: string | null
          id: string
          is_sent: boolean
          job_id: string
          reminder_date: string
          sent_at: string | null
          tone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          application_log_id?: string | null
          created_at?: string
          follow_up_message?: string | null
          id?: string
          is_sent?: boolean
          job_id: string
          reminder_date: string
          sent_at?: string | null
          tone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          application_log_id?: string | null
          created_at?: string
          follow_up_message?: string | null
          id?: string
          is_sent?: boolean
          job_id?: string
          reminder_date?: string
          sent_at?: string | null
          tone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follow_ups_application_log_id_fkey"
            columns: ["application_log_id"]
            isOneToOne: false
            referencedRelation: "application_log"
            referencedColumns: ["id"]
          },
        ]
      }
      followers: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      fraud_analysis: {
        Row: {
          analysis_result: string
          created_at: string
          fraud_score: number
          gpt_analysis: Json | null
          id: string
          risk_factors: Json | null
          tracking_id: string
          visitor_id: string | null
        }
        Insert: {
          analysis_result: string
          created_at?: string
          fraud_score?: number
          gpt_analysis?: Json | null
          id?: string
          risk_factors?: Json | null
          tracking_id: string
          visitor_id?: string | null
        }
        Update: {
          analysis_result?: string
          created_at?: string
          fraud_score?: number
          gpt_analysis?: Json | null
          id?: string
          risk_factors?: Json | null
          tracking_id?: string
          visitor_id?: string | null
        }
        Relationships: []
      }
      fraud_sessions: {
        Row: {
          avg_session_time: number | null
          bounce_rate: number | null
          click_count: number | null
          detected_at: string | null
          device_fingerprint: string | null
          fraud_reasons: string[] | null
          id: string
          ip_address: string | null
          is_flagged: boolean | null
          reviewed_by: string | null
          risk_score: number | null
          session_id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          avg_session_time?: number | null
          bounce_rate?: number | null
          click_count?: number | null
          detected_at?: string | null
          device_fingerprint?: string | null
          fraud_reasons?: string[] | null
          id?: string
          ip_address?: string | null
          is_flagged?: boolean | null
          reviewed_by?: string | null
          risk_score?: number | null
          session_id: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          avg_session_time?: number | null
          bounce_rate?: number | null
          click_count?: number | null
          detected_at?: string | null
          device_fingerprint?: string | null
          fraud_reasons?: string[] | null
          id?: string
          ip_address?: string | null
          is_flagged?: boolean | null
          reviewed_by?: string | null
          risk_score?: number | null
          session_id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      generation_schedule_logs: {
        Row: {
          completed_at: string | null
          error_message: string | null
          id: string
          pages_created: number | null
          pages_failed: number | null
          pages_skipped: number | null
          run_date: string
          started_at: string | null
          status: string
        }
        Insert: {
          completed_at?: string | null
          error_message?: string | null
          id?: string
          pages_created?: number | null
          pages_failed?: number | null
          pages_skipped?: number | null
          run_date?: string
          started_at?: string | null
          status: string
        }
        Update: {
          completed_at?: string | null
          error_message?: string | null
          id?: string
          pages_created?: number | null
          pages_failed?: number | null
          pages_skipped?: number | null
          run_date?: string
          started_at?: string | null
          status?: string
        }
        Relationships: []
      }
      geo_leads: {
        Row: {
          area_code: string | null
          city: string | null
          created_at: string
          id: string
          lat: number | null
          lng: number | null
          phone: string
          state: string | null
          zip_code: string | null
        }
        Insert: {
          area_code?: string | null
          city?: string | null
          created_at?: string
          id?: string
          lat?: number | null
          lng?: number | null
          phone: string
          state?: string | null
          zip_code?: string | null
        }
        Update: {
          area_code?: string | null
          city?: string | null
          created_at?: string
          id?: string
          lat?: number | null
          lng?: number | null
          phone?: string
          state?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      ghost_followups: {
        Row: {
          applicant_phone: string
          application_id: string
          followup_message: string
          id: string
          job_title: string
          metadata: Json | null
          response_content: string | null
          response_received_at: string | null
          sent_at: string | null
          status: string | null
        }
        Insert: {
          applicant_phone: string
          application_id: string
          followup_message: string
          id?: string
          job_title: string
          metadata?: Json | null
          response_content?: string | null
          response_received_at?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          applicant_phone?: string
          application_id?: string
          followup_message?: string
          id?: string
          job_title?: string
          metadata?: Json | null
          response_content?: string | null
          response_received_at?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      gpt_captions: {
        Row: {
          caption_text: string
          created_at: string | null
          id: string
          metadata: Json | null
          platform: string
          trigger_type: string
          used_at: string | null
          user_id: string
          was_used: boolean | null
        }
        Insert: {
          caption_text: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          platform: string
          trigger_type: string
          used_at?: string | null
          user_id: string
          was_used?: boolean | null
        }
        Update: {
          caption_text?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          platform?: string
          trigger_type?: string
          used_at?: string | null
          user_id?: string
          was_used?: boolean | null
        }
        Relationships: []
      }
      gpt_messages: {
        Row: {
          barber_id: string
          client_id: string
          created_at: string | null
          id: string
          message: string
          message_type: string | null
          metadata: Json | null
          responded_at: string | null
          response: string | null
          sent_at: string | null
          suggested_date: string | null
        }
        Insert: {
          barber_id: string
          client_id: string
          created_at?: string | null
          id?: string
          message: string
          message_type?: string | null
          metadata?: Json | null
          responded_at?: string | null
          response?: string | null
          sent_at?: string | null
          suggested_date?: string | null
        }
        Update: {
          barber_id?: string
          client_id?: string
          created_at?: string | null
          id?: string
          message?: string
          message_type?: string | null
          metadata?: Json | null
          responded_at?: string | null
          response?: string | null
          sent_at?: string | null
          suggested_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gpt_messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client_appointment_patterns"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "gpt_messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gpt_messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "cut_streak_leaderboard"
            referencedColumns: ["client_id"]
          },
        ]
      }
      gpt_models: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          prompt_text: string
          type: string
          updated_at: string
          version: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          prompt_text: string
          type: string
          updated_at?: string
          version?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          prompt_text?: string
          type?: string
          updated_at?: string
          version?: number | null
        }
        Relationships: []
      }
      guide_analytics: {
        Row: {
          event_type: string
          guide_id: string | null
          id: string
          ip_address: string | null
          metadata: Json | null
          referrer: string | null
          timestamp: string
          user_agent: string | null
        }
        Insert: {
          event_type: string
          guide_id?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          referrer?: string | null
          timestamp?: string
          user_agent?: string | null
        }
        Update: {
          event_type?: string
          guide_id?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          referrer?: string | null
          timestamp?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guide_analytics_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "seo_job_guides"
            referencedColumns: ["id"]
          },
        ]
      }
      headline_performance: {
        Row: {
          avg_ctr: number | null
          city: string
          conversion_rate: number | null
          created_at: string
          headline_text: string
          id: string
          job_type: string
          times_used: number | null
          tone: string
          total_applications: number | null
          total_clicks: number | null
          updated_at: string
        }
        Insert: {
          avg_ctr?: number | null
          city: string
          conversion_rate?: number | null
          created_at?: string
          headline_text: string
          id?: string
          job_type: string
          times_used?: number | null
          tone: string
          total_applications?: number | null
          total_clicks?: number | null
          updated_at?: string
        }
        Update: {
          avg_ctr?: number | null
          city?: string
          conversion_rate?: number | null
          created_at?: string
          headline_text?: string
          id?: string
          job_type?: string
          times_used?: number | null
          tone?: string
          total_applications?: number | null
          total_clicks?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      hire_meter_stats: {
        Row: {
          applied_count: number
          created_at: string
          ghosted_count: number
          id: string
          interview_count: number
          offer_count: number
          rejected_count: number
          score: number
          updated_at: string
          user_id: string
          week_start_date: string
        }
        Insert: {
          applied_count?: number
          created_at?: string
          ghosted_count?: number
          id?: string
          interview_count?: number
          offer_count?: number
          rejected_count?: number
          score?: number
          updated_at?: string
          user_id: string
          week_start_date: string
        }
        Update: {
          applied_count?: number
          created_at?: string
          ghosted_count?: number
          id?: string
          interview_count?: number
          offer_count?: number
          rejected_count?: number
          score?: number
          updated_at?: string
          user_id?: string
          week_start_date?: string
        }
        Relationships: []
      }
      inbound_leads: {
        Row: {
          click_link: boolean | null
          created_at: string | null
          email: string
          id: string
          job_interest: string | null
          location: string | null
          name: string
          phone: string | null
          resume_uploaded: boolean | null
          score: number | null
          signed_up: boolean | null
          source: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          click_link?: boolean | null
          created_at?: string | null
          email: string
          id?: string
          job_interest?: string | null
          location?: string | null
          name: string
          phone?: string | null
          resume_uploaded?: boolean | null
          score?: number | null
          signed_up?: boolean | null
          source?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          click_link?: boolean | null
          created_at?: string | null
          email?: string
          id?: string
          job_interest?: string | null
          location?: string | null
          name?: string
          phone?: string | null
          resume_uploaded?: boolean | null
          score?: number | null
          signed_up?: boolean | null
          source?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      indeed_jobs: {
        Row: {
          company: string
          created_at: string
          description: string | null
          id: string
          location: string | null
          posted_at: string | null
          redirect_url: string
          source: string
          title: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          posted_at?: string | null
          redirect_url: string
          source?: string
          title: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          posted_at?: string | null
          redirect_url?: string
          source?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      instant_apply_analytics: {
        Row: {
          action_type: string
          ai_message_used: boolean | null
          created_at: string | null
          id: string
          job_id: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          ai_message_used?: boolean | null
          created_at?: string | null
          id?: string
          job_id: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          ai_message_used?: boolean | null
          created_at?: string | null
          id?: string
          job_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      interview_invites: {
        Row: {
          applicant_email: string | null
          applicant_id: string | null
          applicant_name: string
          applicant_phone: string
          calendar_event_id: string | null
          employer_id: string | null
          id: string
          job_id: string | null
          job_title: string | null
          meeting_link: string | null
          message_content: string
          metadata: Json | null
          response_content: string | null
          response_received_at: string | null
          sms_sent_at: string | null
          status: string | null
          suggested_time: string | null
        }
        Insert: {
          applicant_email?: string | null
          applicant_id?: string | null
          applicant_name: string
          applicant_phone: string
          calendar_event_id?: string | null
          employer_id?: string | null
          id?: string
          job_id?: string | null
          job_title?: string | null
          meeting_link?: string | null
          message_content: string
          metadata?: Json | null
          response_content?: string | null
          response_received_at?: string | null
          sms_sent_at?: string | null
          status?: string | null
          suggested_time?: string | null
        }
        Update: {
          applicant_email?: string | null
          applicant_id?: string | null
          applicant_name?: string
          applicant_phone?: string
          calendar_event_id?: string | null
          employer_id?: string | null
          id?: string
          job_id?: string | null
          job_title?: string | null
          meeting_link?: string | null
          message_content?: string
          metadata?: Json | null
          response_content?: string | null
          response_received_at?: string | null
          sms_sent_at?: string | null
          status?: string | null
          suggested_time?: string | null
        }
        Relationships: []
      }
      invite_rewards: {
        Row: {
          claimed_at: string | null
          created_at: string | null
          id: string
          is_claimed: boolean | null
          referred_id: string | null
          referrer_id: string
          reward_type: string
          reward_value: number | null
        }
        Insert: {
          claimed_at?: string | null
          created_at?: string | null
          id?: string
          is_claimed?: boolean | null
          referred_id?: string | null
          referrer_id: string
          reward_type: string
          reward_value?: number | null
        }
        Update: {
          claimed_at?: string | null
          created_at?: string | null
          id?: string
          is_claimed?: boolean | null
          referred_id?: string | null
          referrer_id?: string
          reward_type?: string
          reward_value?: number | null
        }
        Relationships: []
      }
      job_alert_leads: {
        Row: {
          city: string
          created_at: string
          id: string
          job_type: string
          name: string
          phone: string
          ready_for_interviews: boolean
          resume_url: string | null
          sms_opt_in: boolean
          updated_at: string
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          job_type: string
          name: string
          phone: string
          ready_for_interviews?: boolean
          resume_url?: string | null
          sms_opt_in?: boolean
          updated_at?: string
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          job_type?: string
          name?: string
          phone?: string
          ready_for_interviews?: boolean
          resume_url?: string | null
          sms_opt_in?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      job_alert_logs: {
        Row: {
          alert_id: string
          created_at: string
          delivery_status: string
          error_message: string | null
          id: string
          jobs_sent: string[] | null
          status: string | null
          timestamp: string
          user_id: string | null
        }
        Insert: {
          alert_id: string
          created_at?: string
          delivery_status?: string
          error_message?: string | null
          id?: string
          jobs_sent?: string[] | null
          status?: string | null
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          alert_id?: string
          created_at?: string
          delivery_status?: string
          error_message?: string | null
          id?: string
          jobs_sent?: string[] | null
          status?: string | null
          timestamp?: string
          user_id?: string | null
        }
        Relationships: []
      }
      job_alerts: {
        Row: {
          city: string
          created_at: string
          email: string | null
          frequency: string
          id: string
          is_active: boolean
          last_sent_at: string | null
          phone: string | null
          preferred_locations: string[] | null
          preferred_method: string
          tags: string[] | null
          updated_at: string
          verification_code: string | null
          verified_at: string | null
        }
        Insert: {
          city: string
          created_at?: string
          email?: string | null
          frequency?: string
          id?: string
          is_active?: boolean
          last_sent_at?: string | null
          phone?: string | null
          preferred_locations?: string[] | null
          preferred_method: string
          tags?: string[] | null
          updated_at?: string
          verification_code?: string | null
          verified_at?: string | null
        }
        Update: {
          city?: string
          created_at?: string
          email?: string | null
          frequency?: string
          id?: string
          is_active?: boolean
          last_sent_at?: string | null
          phone?: string | null
          preferred_locations?: string[] | null
          preferred_method?: string
          tags?: string[] | null
          updated_at?: string
          verification_code?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      job_application_payments: {
        Row: {
          amount: number
          applicant_name: string
          created_at: string
          currency: string | null
          id: string
          priority_expires_at: string | null
          status: string | null
          stripe_session_id: string | null
          updated_at: string
          user_email: string
          user_status: string | null
          webhook_processed_at: string | null
        }
        Insert: {
          amount?: number
          applicant_name: string
          created_at?: string
          currency?: string | null
          id?: string
          priority_expires_at?: string | null
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_email: string
          user_status?: string | null
          webhook_processed_at?: string | null
        }
        Update: {
          amount?: number
          applicant_name?: string
          created_at?: string
          currency?: string | null
          id?: string
          priority_expires_at?: string | null
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_email?: string
          user_status?: string | null
          webhook_processed_at?: string | null
        }
        Relationships: []
      }
      job_application_stats: {
        Row: {
          applications_this_week: number | null
          hire_rate: number | null
          id: string
          job_id: string
          last_updated: string | null
          total_applications: number | null
          total_hired: number | null
        }
        Insert: {
          applications_this_week?: number | null
          hire_rate?: number | null
          id?: string
          job_id: string
          last_updated?: string | null
          total_applications?: number | null
          total_hired?: number | null
        }
        Update: {
          applications_this_week?: number | null
          hire_rate?: number | null
          id?: string
          job_id?: string
          last_updated?: string | null
          total_applications?: number | null
          total_hired?: number | null
        }
        Relationships: []
      }
      job_application_submissions: {
        Row: {
          city: string
          created_at: string
          email: string
          full_name: string
          id: string
          job_type: string
          message: string | null
          phone: string
          qr_scan_id: string | null
          source: string
          status: string
          updated_at: string
          utm_params: Json | null
        }
        Insert: {
          city: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          job_type: string
          message?: string | null
          phone: string
          qr_scan_id?: string | null
          source?: string
          status?: string
          updated_at?: string
          utm_params?: Json | null
        }
        Update: {
          city?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          job_type?: string
          message?: string | null
          phone?: string
          qr_scan_id?: string | null
          source?: string
          status?: string
          updated_at?: string
          utm_params?: Json | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          alerts_opt_in: boolean | null
          applicant_email: string
          applicant_name: string
          applicant_phone: string
          availability: string
          city: string | null
          cover_message: string | null
          created_at: string
          email_address: string | null
          full_name: string | null
          id: string
          instant_apply: boolean | null
          is_fake_job: boolean | null
          job_id: string | null
          job_title: string | null
          notes: string | null
          phone_number: string | null
          referrer: string | null
          resume_url: string | null
          source: string | null
          start_availability: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          alerts_opt_in?: boolean | null
          applicant_email: string
          applicant_name: string
          applicant_phone: string
          availability: string
          city?: string | null
          cover_message?: string | null
          created_at?: string
          email_address?: string | null
          full_name?: string | null
          id?: string
          instant_apply?: boolean | null
          is_fake_job?: boolean | null
          job_id?: string | null
          job_title?: string | null
          notes?: string | null
          phone_number?: string | null
          referrer?: string | null
          resume_url?: string | null
          source?: string | null
          start_availability?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          alerts_opt_in?: boolean | null
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string
          availability?: string
          city?: string | null
          cover_message?: string | null
          created_at?: string
          email_address?: string | null
          full_name?: string | null
          id?: string
          instant_apply?: boolean | null
          is_fake_job?: boolean | null
          job_id?: string | null
          job_title?: string | null
          notes?: string | null
          phone_number?: string | null
          referrer?: string | null
          resume_url?: string | null
          source?: string | null
          start_availability?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      job_applications_tracking: {
        Row: {
          application_date: string | null
          company: string
          created_at: string
          follow_up_date: string | null
          id: string
          job_title: string
          job_url: string | null
          notes: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          application_date?: string | null
          company: string
          created_at?: string
          follow_up_date?: string | null
          id?: string
          job_title: string
          job_url?: string | null
          notes?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          application_date?: string | null
          company?: string
          created_at?: string
          follow_up_date?: string | null
          id?: string
          job_title?: string
          job_url?: string | null
          notes?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      job_apply_clicks: {
        Row: {
          created_at: string
          id: string
          job_id: string
          timestamp: string
          user_agent: string | null
          user_ip: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          timestamp?: string
          user_agent?: string | null
          user_ip?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          timestamp?: string
          user_agent?: string | null
          user_ip?: string | null
        }
        Relationships: []
      }
      job_import_logs: {
        Row: {
          duplicates_skipped: number | null
          error_message: string | null
          id: string
          jobs_imported: number
          source: string
          status: string
          timestamp: string
          total_jobs_processed: number | null
        }
        Insert: {
          duplicates_skipped?: number | null
          error_message?: string | null
          id?: string
          jobs_imported?: number
          source: string
          status?: string
          timestamp?: string
          total_jobs_processed?: number | null
        }
        Update: {
          duplicates_skipped?: number | null
          error_message?: string | null
          id?: string
          jobs_imported?: number
          source?: string
          status?: string
          timestamp?: string
          total_jobs_processed?: number | null
        }
        Relationships: []
      }
      job_listings: {
        Row: {
          category: string
          city: string
          created_at: string
          id: string
          link: string
          location: string | null
          posted_at: string | null
          source: string
          title: string
        }
        Insert: {
          category: string
          city: string
          created_at?: string
          id?: string
          link: string
          location?: string | null
          posted_at?: string | null
          source?: string
          title: string
        }
        Update: {
          category?: string
          city?: string
          created_at?: string
          id?: string
          link?: string
          location?: string | null
          posted_at?: string | null
          source?: string
          title?: string
        }
        Relationships: []
      }
      job_match_scores: {
        Row: {
          created_at: string | null
          id: string
          job_id: string
          key_factors: string[] | null
          match_reason: string | null
          match_score: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id: string
          key_factors?: string[] | null
          match_reason?: string | null
          match_score?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string
          key_factors?: string[] | null
          match_reason?: string | null
          match_score?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      job_matches: {
        Row: {
          applicant_id: string | null
          availability_score: number | null
          created_at: string
          id: string
          job_id: string | null
          keyword_score: number | null
          location_score: number | null
          match_reasons: Json | null
          match_score: number
          updated_at: string
        }
        Insert: {
          applicant_id?: string | null
          availability_score?: number | null
          created_at?: string
          id?: string
          job_id?: string | null
          keyword_score?: number | null
          location_score?: number | null
          match_reasons?: Json | null
          match_score: number
          updated_at?: string
        }
        Update: {
          applicant_id?: string | null
          availability_score?: number | null
          created_at?: string
          id?: string
          job_id?: string | null
          keyword_score?: number | null
          location_score?: number | null
          match_reasons?: Json | null
          match_score?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_matches_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_matches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_messages: {
        Row: {
          created_at: string
          id: string
          job_id: string
          message_text: string
          tone: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          message_text: string
          tone?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          message_text?: string
          tone?: string
          user_id?: string
        }
        Relationships: []
      }
      job_notifications: {
        Row: {
          created_at: string
          id: string
          keywords: string[] | null
          notification_enabled: boolean | null
          phone_number: string | null
          preferred_city: string | null
          push_enabled: boolean | null
          salary_min: number | null
          sms_enabled: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          keywords?: string[] | null
          notification_enabled?: boolean | null
          phone_number?: string | null
          preferred_city?: string | null
          push_enabled?: boolean | null
          salary_min?: number | null
          sms_enabled?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          keywords?: string[] | null
          notification_enabled?: boolean | null
          phone_number?: string | null
          preferred_city?: string | null
          push_enabled?: boolean | null
          salary_min?: number | null
          sms_enabled?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      job_referral_clicks: {
        Row: {
          city: string | null
          clicked_at: string | null
          conversion_date: string | null
          converted: boolean | null
          id: string
          payout_amount: number | null
          referral_code: string
          referrer_user_id: string | null
        }
        Insert: {
          city?: string | null
          clicked_at?: string | null
          conversion_date?: string | null
          converted?: boolean | null
          id?: string
          payout_amount?: number | null
          referral_code: string
          referrer_user_id?: string | null
        }
        Update: {
          city?: string | null
          clicked_at?: string | null
          conversion_date?: string | null
          converted?: boolean | null
          id?: string
          payout_amount?: number | null
          referral_code?: string
          referrer_user_id?: string | null
        }
        Relationships: []
      }
      job_referral_payouts: {
        Row: {
          amount: number
          id: string
          payout_date: string | null
          referral_click_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          id?: string
          payout_date?: string | null
          referral_click_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          id?: string
          payout_date?: string | null
          referral_click_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_referral_payouts_referral_click_id_fkey"
            columns: ["referral_click_id"]
            isOneToOne: false
            referencedRelation: "job_referral_clicks"
            referencedColumns: ["id"]
          },
        ]
      }
      job_referral_stats: {
        Row: {
          city: string | null
          created_at: string | null
          id: string
          referrals_generated: number | null
          total_earnings: number | null
          updated_at: string | null
          user_id: string | null
          username: string
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          id?: string
          referrals_generated?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id?: string | null
          username: string
        }
        Update: {
          city?: string | null
          created_at?: string | null
          id?: string
          referrals_generated?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      job_referrals: {
        Row: {
          applied: boolean | null
          created_at: string
          friend_email: string
          id: string
          job_id: string
          message: string | null
          opened: boolean | null
          referrer_email: string
          timestamp: string
        }
        Insert: {
          applied?: boolean | null
          created_at?: string
          friend_email: string
          id?: string
          job_id: string
          message?: string | null
          opened?: boolean | null
          referrer_email: string
          timestamp?: string
        }
        Update: {
          applied?: boolean | null
          created_at?: string
          friend_email?: string
          id?: string
          job_id?: string
          message?: string | null
          opened?: boolean | null
          referrer_email?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_job_referrals_job_id"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "real_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_reports: {
        Row: {
          admin_notes: string | null
          created_at: string
          description: string | null
          id: string
          job_id: string
          reason: string
          reporter_id: string
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          description?: string | null
          id?: string
          job_id: string
          reason: string
          reporter_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          description?: string | null
          id?: string
          job_id?: string
          reason?: string
          reporter_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_reports_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "user_posted_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          is_verified: boolean | null
          job_id: string
          rating: number
          reviewer_id: string
          updated_at: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          job_id: string
          rating: number
          reviewer_id: string
          updated_at?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          job_id?: string
          rating?: number
          reviewer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_reviews_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "user_posted_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_rewrites: {
        Row: {
          created_at: string | null
          id: string
          job_id: string | null
          original_description: string
          rewritten_description: string
          style_preferences: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          original_description: string
          rewritten_description: string
          style_preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          original_description?: string
          rewritten_description?: string
          style_preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      job_safety_scans: {
        Row: {
          created_at: string
          id: string
          job_id: string
          missing_info: Json | null
          pay_rating: string | null
          red_flags: Json | null
          scan_summary: string
          trust_score: number
          updated_at: string
          user_id: string | null
          verdict: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          missing_info?: Json | null
          pay_rating?: string | null
          red_flags?: Json | null
          scan_summary: string
          trust_score: number
          updated_at?: string
          user_id?: string | null
          verdict: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          missing_info?: Json | null
          pay_rating?: string | null
          red_flags?: Json | null
          scan_summary?: string
          trust_score?: number
          updated_at?: string
          user_id?: string | null
          verdict?: string
        }
        Relationships: []
      }
      job_save_analytics: {
        Row: {
          action_type: string
          created_at: string | null
          id: string
          job_id: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          id?: string
          job_id: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          id?: string
          job_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      job_share_events: {
        Row: {
          created_at: string
          id: string
          job_id: string
          platform: string | null
          share_url: string | null
          unlocked_job: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          platform?: string | null
          share_url?: string | null
          unlocked_job?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          platform?: string | null
          share_url?: string | null
          unlocked_job?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      job_shares: {
        Row: {
          created_at: string
          id: string
          job_id: string
          platform: string
          timestamp: string
          user_agent: string | null
          user_ip: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          platform: string
          timestamp?: string
          user_agent?: string | null
          user_ip?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          platform?: string
          timestamp?: string
          user_agent?: string | null
          user_ip?: string | null
        }
        Relationships: []
      }
      job_stats: {
        Row: {
          created_at: string | null
          id: string
          is_underperforming: boolean | null
          job_id: string
          last_application_at: string | null
          last_view_at: string | null
          repost_suggested_at: string | null
          total_applicants: number | null
          total_views: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_underperforming?: boolean | null
          job_id: string
          last_application_at?: string | null
          last_view_at?: string | null
          repost_suggested_at?: string | null
          total_applicants?: number | null
          total_views?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_underperforming?: boolean | null
          job_id?: string
          last_application_at?: string | null
          last_view_at?: string | null
          repost_suggested_at?: string | null
          total_applicants?: number | null
          total_views?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      job_status_flags: {
        Row: {
          created_at: string | null
          expires_at: string | null
          flag_type: string
          id: string
          is_active: boolean | null
          job_id: string
          metadata: Json | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          flag_type: string
          id?: string
          is_active?: boolean | null
          job_id: string
          metadata?: Json | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          flag_type?: string
          id?: string
          is_active?: boolean | null
          job_id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      job_suggestions: {
        Row: {
          clicked: boolean | null
          created_at: string | null
          gpt_generated_content: Json | null
          id: string
          job_type: string | null
          region: string
          suggestion_text: string
          user_id: string | null
          viewed: boolean | null
        }
        Insert: {
          clicked?: boolean | null
          created_at?: string | null
          gpt_generated_content?: Json | null
          id?: string
          job_type?: string | null
          region: string
          suggestion_text: string
          user_id?: string | null
          viewed?: boolean | null
        }
        Update: {
          clicked?: boolean | null
          created_at?: string | null
          gpt_generated_content?: Json | null
          id?: string
          job_type?: string | null
          region?: string
          suggestion_text?: string
          user_id?: string | null
          viewed?: boolean | null
        }
        Relationships: []
      }
      job_sync_logs: {
        Row: {
          created_at: string
          error_message: string | null
          feed_results: Json | null
          id: string
          status: string
          sync_completed_at: string | null
          sync_started_at: string
          total_feeds_processed: number | null
          total_jobs_inserted: number | null
          total_jobs_processed: number | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          feed_results?: Json | null
          id?: string
          status?: string
          sync_completed_at?: string | null
          sync_started_at?: string
          total_feeds_processed?: number | null
          total_jobs_inserted?: number | null
          total_jobs_processed?: number | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          feed_results?: Json | null
          id?: string
          status?: string
          sync_completed_at?: string | null
          sync_started_at?: string
          total_feeds_processed?: number | null
          total_jobs_inserted?: number | null
          total_jobs_processed?: number | null
        }
        Relationships: []
      }
      job_types: {
        Row: {
          category: string | null
          created_at: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_urgency_metrics: {
        Row: {
          applications_today: number | null
          created_at: string | null
          id: string
          is_trending: boolean | null
          job_id: string
          posted_at: string | null
          updated_at: string | null
          urgency_level: string | null
          views_today: number | null
        }
        Insert: {
          applications_today?: number | null
          created_at?: string | null
          id?: string
          is_trending?: boolean | null
          job_id: string
          posted_at?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          views_today?: number | null
        }
        Update: {
          applications_today?: number | null
          created_at?: string | null
          id?: string
          is_trending?: boolean | null
          job_id?: string
          posted_at?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          views_today?: number | null
        }
        Relationships: []
      }
      job_views: {
        Row: {
          applied: boolean | null
          created_at: string
          id: string
          job_id: string
          referrer: string | null
          timestamp: string
          user_agent: string | null
          user_id: string | null
          user_ip: string | null
          view_time_seconds: number | null
          viewed_at: string | null
        }
        Insert: {
          applied?: boolean | null
          created_at?: string
          id?: string
          job_id: string
          referrer?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
          user_ip?: string | null
          view_time_seconds?: number | null
          viewed_at?: string | null
        }
        Update: {
          applied?: boolean | null
          created_at?: string
          id?: string
          job_id?: string
          referrer?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
          user_ip?: string | null
          view_time_seconds?: number | null
          viewed_at?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          application_count: number | null
          auto_repost_enabled: boolean | null
          brand_name: string | null
          category: string | null
          city: string | null
          city_tag: string | null
          company: string | null
          contact: string
          created_at: string | null
          description: string
          employer_auto_repost: boolean | null
          employer_id: string | null
          external_id: string | null
          id: string
          is_featured: boolean | null
          is_hot: boolean | null
          is_verified: boolean | null
          job_ai_summary: string | null
          job_type: string | null
          last_posted: string | null
          location: string
          pay_range: string
          posted_at: string | null
          redirect_url: string | null
          repost_count: number | null
          salary_max: number | null
          salary_min: number | null
          similar_tags: string[] | null
          source: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          views_today: number | null
        }
        Insert: {
          application_count?: number | null
          auto_repost_enabled?: boolean | null
          brand_name?: string | null
          category?: string | null
          city?: string | null
          city_tag?: string | null
          company?: string | null
          contact: string
          created_at?: string | null
          description: string
          employer_auto_repost?: boolean | null
          employer_id?: string | null
          external_id?: string | null
          id?: string
          is_featured?: boolean | null
          is_hot?: boolean | null
          is_verified?: boolean | null
          job_ai_summary?: string | null
          job_type?: string | null
          last_posted?: string | null
          location: string
          pay_range: string
          posted_at?: string | null
          redirect_url?: string | null
          repost_count?: number | null
          salary_max?: number | null
          salary_min?: number | null
          similar_tags?: string[] | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views_today?: number | null
        }
        Update: {
          application_count?: number | null
          auto_repost_enabled?: boolean | null
          brand_name?: string | null
          category?: string | null
          city?: string | null
          city_tag?: string | null
          company?: string | null
          contact?: string
          created_at?: string | null
          description?: string
          employer_auto_repost?: boolean | null
          employer_id?: string | null
          external_id?: string | null
          id?: string
          is_featured?: boolean | null
          is_hot?: boolean | null
          is_verified?: boolean | null
          job_ai_summary?: string | null
          job_type?: string | null
          last_posted?: string | null
          location?: string
          pay_range?: string
          posted_at?: string | null
          redirect_url?: string | null
          repost_count?: number | null
          salary_max?: number | null
          salary_min?: number | null
          similar_tags?: string[] | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views_today?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs_to_post: {
        Row: {
          business_name: string
          city: string
          created_at: string
          id: string
          job_title: string
          job_type: string
          phone_number: string
          posted: boolean | null
          state: string
          updated_at: string
        }
        Insert: {
          business_name: string
          city: string
          created_at?: string
          id?: string
          job_title: string
          job_type: string
          phone_number: string
          posted?: boolean | null
          state: string
          updated_at?: string
        }
        Update: {
          business_name?: string
          city?: string
          created_at?: string
          id?: string
          job_title?: string
          job_type?: string
          phone_number?: string
          posted?: boolean | null
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      last_chance_offers: {
        Row: {
          accepted: boolean | null
          barber_id: string | null
          bonus_message: string | null
          client_id: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          plan_id: string | null
        }
        Insert: {
          accepted?: boolean | null
          barber_id?: string | null
          bonus_message?: string | null
          client_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          plan_id?: string | null
        }
        Update: {
          accepted?: boolean | null
          barber_id?: string | null
          bonus_message?: string | null
          client_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          plan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "last_chance_offers_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_scoring_logs: {
        Row: {
          created_at: string
          factors: Json | null
          id: string
          phone_number: string
          score: number
        }
        Insert: {
          created_at?: string
          factors?: Json | null
          id?: string
          phone_number: string
          score: number
        }
        Update: {
          created_at?: string
          factors?: Json | null
          id?: string
          phone_number?: string
          score?: number
        }
        Relationships: []
      }
      lead_status: {
        Row: {
          applied: boolean | null
          created_at: string
          gpt_score: number | null
          id: string
          last_gpt_analysis: string | null
          last_nudged_at: string | null
          nudged_times: number | null
          phone: string
          subscribed: boolean | null
          updated_at: string
        }
        Insert: {
          applied?: boolean | null
          created_at?: string
          gpt_score?: number | null
          id?: string
          last_gpt_analysis?: string | null
          last_nudged_at?: string | null
          nudged_times?: number | null
          phone: string
          subscribed?: boolean | null
          updated_at?: string
        }
        Update: {
          applied?: boolean | null
          created_at?: string
          gpt_score?: number | null
          id?: string
          last_gpt_analysis?: string | null
          last_nudged_at?: string | null
          nudged_times?: number | null
          phone?: string
          subscribed?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      leaderboard_logs: {
        Row: {
          created_at: string | null
          id: string
          points: number | null
          profile_id: string | null
          reason: string | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          points?: number | null
          profile_id?: string | null
          reason?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          points?: number | null
          profile_id?: string | null
          reason?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_logs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "barber_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leaderboard_logs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "client_streak_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leaderboard_logs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboard_snapshots: {
        Row: {
          barber_id: string
          created_at: string | null
          id: string
          monthly_earnings: number | null
          monthly_rank: number | null
          monthly_referrals: number | null
          snapshot_month: string
          snapshot_week: string
          weekly_earnings: number | null
          weekly_rank: number | null
          weekly_referrals: number | null
        }
        Insert: {
          barber_id: string
          created_at?: string | null
          id?: string
          monthly_earnings?: number | null
          monthly_rank?: number | null
          monthly_referrals?: number | null
          snapshot_month: string
          snapshot_week: string
          weekly_earnings?: number | null
          weekly_rank?: number | null
          weekly_referrals?: number | null
        }
        Update: {
          barber_id?: string
          created_at?: string | null
          id?: string
          monthly_earnings?: number | null
          monthly_rank?: number | null
          monthly_referrals?: number | null
          snapshot_month?: string
          snapshot_week?: string
          weekly_earnings?: number | null
          weekly_rank?: number | null
          weekly_referrals?: number | null
        }
        Relationships: []
      }
      letter_vault_stats: {
        Row: {
          best_tone: string | null
          created_at: string
          id: string
          interviews_triggered: number
          total_letters: number
          updated_at: string
          user_id: string
        }
        Insert: {
          best_tone?: string | null
          created_at?: string
          id?: string
          interviews_triggered?: number
          total_letters?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          best_tone?: string | null
          created_at?: string
          id?: string
          interviews_triggered?: number
          total_letters?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      live_leads: {
        Row: {
          created_at: string
          id: string
          last_message: string | null
          last_updated: string
          phone: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message?: string | null
          last_updated?: string
          phone: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message?: string | null
          last_updated?: string
          phone?: string
          status?: string
        }
        Relationships: []
      }
      local_partners: {
        Row: {
          address: string | null
          agency_name: string
          city: string
          contact_email: string | null
          contact_person: string | null
          created_at: string
          created_by_admin_id: string | null
          id: string
          languages_supported: string[] | null
          last_contacted: string | null
          notes: string | null
          partnership_level: string | null
          phone: string | null
          qr_flyer_generated: boolean | null
          status: string | null
          type: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          agency_name: string
          city: string
          contact_email?: string | null
          contact_person?: string | null
          created_at?: string
          created_by_admin_id?: string | null
          id?: string
          languages_supported?: string[] | null
          last_contacted?: string | null
          notes?: string | null
          partnership_level?: string | null
          phone?: string | null
          qr_flyer_generated?: boolean | null
          status?: string | null
          type: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          agency_name?: string
          city?: string
          contact_email?: string | null
          contact_person?: string | null
          created_at?: string
          created_by_admin_id?: string | null
          id?: string
          languages_supported?: string[] | null
          last_contacted?: string | null
          notes?: string | null
          partnership_level?: string | null
          phone?: string | null
          qr_flyer_generated?: boolean | null
          status?: string | null
          type?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      map_share_events: {
        Row: {
          barber_id: string | null
          barber_location: string | null
          barber_mood: string | null
          barber_name: string | null
          caption_generated: string | null
          created_at: string
          id: string
          ip_address: string | null
          referrer_url: string | null
          share_platform: string
          user_agent: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_source: string | null
        }
        Insert: {
          barber_id?: string | null
          barber_location?: string | null
          barber_mood?: string | null
          barber_name?: string | null
          caption_generated?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          referrer_url?: string | null
          share_platform: string
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
        }
        Update: {
          barber_id?: string | null
          barber_location?: string | null
          barber_mood?: string | null
          barber_name?: string | null
          caption_generated?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          referrer_url?: string | null
          share_platform?: string
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "map_share_events_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "map_share_events_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "map_share_events_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "map_share_events_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "map_share_events_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
        ]
      }
      marketplace_purchases: {
        Row: {
          amount: number
          buyer_id: string | null
          created_at: string
          id: string
          pack_id: string | null
          platform_fee: number
          prompt_id: string | null
          seller_id: string | null
          seller_payout: number
          status: string | null
        }
        Insert: {
          amount: number
          buyer_id?: string | null
          created_at?: string
          id?: string
          pack_id?: string | null
          platform_fee?: number
          prompt_id?: string | null
          seller_id?: string | null
          seller_payout: number
          status?: string | null
        }
        Update: {
          amount?: number
          buyer_id?: string | null
          created_at?: string
          id?: string
          pack_id?: string | null
          platform_fee?: number
          prompt_id?: string | null
          seller_id?: string | null
          seller_payout?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_purchases_pack_id_fkey"
            columns: ["pack_id"]
            isOneToOne: false
            referencedRelation: "prompt_packs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_purchases_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
        ]
      }
      match_optimizer_results: {
        Row: {
          boosted_score: number | null
          created_at: string
          id: string
          improved_resume: string | null
          job_description: string
          job_title: string
          missing_keywords: string[] | null
          original_resume: string
          original_score: number
          resume_file_url: string | null
          strong_matches: string[] | null
          suggestions: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          boosted_score?: number | null
          created_at?: string
          id?: string
          improved_resume?: string | null
          job_description: string
          job_title: string
          missing_keywords?: string[] | null
          original_resume: string
          original_score: number
          resume_file_url?: string | null
          strong_matches?: string[] | null
          suggestions?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          boosted_score?: number | null
          created_at?: string
          id?: string
          improved_resume?: string | null
          job_description?: string
          job_title?: string
          missing_keywords?: string[] | null
          original_resume?: string
          original_score?: number
          resume_file_url?: string | null
          strong_matches?: string[] | null
          suggestions?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      match_scores: {
        Row: {
          callback_forecast: number | null
          created_at: string
          gap_analysis: Json | null
          id: string
          job_description: string
          job_id: string
          job_title: string
          match_score: number
          resume_text: string
          suggestions: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          callback_forecast?: number | null
          created_at?: string
          gap_analysis?: Json | null
          id?: string
          job_description: string
          job_id: string
          job_title: string
          match_score?: number
          resume_text: string
          suggestions?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          callback_forecast?: number | null
          created_at?: string
          gap_analysis?: Json | null
          id?: string
          job_description?: string
          job_id?: string
          job_title?: string
          match_score?: number
          resume_text?: string
          suggestions?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      microsites: {
        Row: {
          city: string
          conversion_count: number
          created_at: string
          featured_jobs: Json | null
          hero_content: string
          id: string
          job_type: string | null
          language: string
          local_stats: Json | null
          meta_description: string | null
          meta_title: string | null
          site_description: string | null
          site_title: string
          slug: string
          status: string
          testimonials: Json | null
          updated_at: string
          views_count: number
        }
        Insert: {
          city: string
          conversion_count?: number
          created_at?: string
          featured_jobs?: Json | null
          hero_content: string
          id?: string
          job_type?: string | null
          language?: string
          local_stats?: Json | null
          meta_description?: string | null
          meta_title?: string | null
          site_description?: string | null
          site_title: string
          slug: string
          status?: string
          testimonials?: Json | null
          updated_at?: string
          views_count?: number
        }
        Update: {
          city?: string
          conversion_count?: number
          created_at?: string
          featured_jobs?: Json | null
          hero_content?: string
          id?: string
          job_type?: string | null
          language?: string
          local_stats?: Json | null
          meta_description?: string | null
          meta_title?: string | null
          site_description?: string | null
          site_title?: string
          slug?: string
          status?: string
          testimonials?: Json | null
          updated_at?: string
          views_count?: number
        }
        Relationships: []
      }
      monetized_offers: {
        Row: {
          created_at: string
          cta_text: string
          description: string
          display_order: number | null
          estimated_payout: number | null
          id: string
          image: string | null
          is_active: boolean
          link: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_text: string
          description: string
          display_order?: number | null
          estimated_payout?: number | null
          id?: string
          image?: string | null
          is_active?: boolean
          link: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_text?: string
          description?: string
          display_order?: number | null
          estimated_payout?: number | null
          id?: string
          image?: string | null
          is_active?: boolean
          link?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      mood_status_history: {
        Row: {
          barber_id: string
          celebration_sent: boolean
          created_at: string
          ctr_score: number
          id: string
          new_status: string
          previous_status: string
          region: string
          triggered_at: string
        }
        Insert: {
          barber_id: string
          celebration_sent?: boolean
          created_at?: string
          ctr_score?: number
          id?: string
          new_status: string
          previous_status: string
          region: string
          triggered_at?: string
        }
        Update: {
          barber_id?: string
          celebration_sent?: boolean
          created_at?: string
          ctr_score?: number
          id?: string
          new_status?: string
          previous_status?: string
          region?: string
          triggered_at?: string
        }
        Relationships: []
      }
      mood_triggers: {
        Row: {
          achievement_text: string
          city: string | null
          confetti_triggered: boolean
          created_at: string
          flyer_id: string | null
          id: string
          trigger_type: string
          trigger_value: number
          user_id: string | null
        }
        Insert: {
          achievement_text: string
          city?: string | null
          confetti_triggered?: boolean
          created_at?: string
          flyer_id?: string | null
          id?: string
          trigger_type: string
          trigger_value: number
          user_id?: string | null
        }
        Update: {
          achievement_text?: string
          city?: string | null
          confetti_triggered?: boolean
          created_at?: string
          flyer_id?: string | null
          id?: string
          trigger_type?: string
          trigger_value?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mood_triggers_flyer_id_fkey"
            columns: ["flyer_id"]
            isOneToOne: false
            referencedRelation: "flyer_exports"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_logs: {
        Row: {
          content: string
          email: string
          error_message: string | null
          id: string
          notification_type: string
          sent_at: string
          status: string
          subject: string
          user_id: string
          withdrawal_id: string | null
        }
        Insert: {
          content: string
          email: string
          error_message?: string | null
          id?: string
          notification_type: string
          sent_at?: string
          status?: string
          subject: string
          user_id: string
          withdrawal_id?: string | null
        }
        Update: {
          content?: string
          email?: string
          error_message?: string | null
          id?: string
          notification_type?: string
          sent_at?: string
          status?: string
          subject?: string
          user_id?: string
          withdrawal_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_withdrawal_id_fkey"
            columns: ["withdrawal_id"]
            isOneToOne: false
            referencedRelation: "withdrawals"
            referencedColumns: ["id"]
          },
        ]
      }
      page_generation_logs: {
        Row: {
          city: string
          completed_at: string | null
          created_at: string
          id: string
          job_type: string
          message: string | null
          status: string
        }
        Insert: {
          city: string
          completed_at?: string | null
          created_at?: string
          id?: string
          job_type: string
          message?: string | null
          status: string
        }
        Update: {
          city?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          job_type?: string
          message?: string | null
          status?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          city: string
          created_at: string
          id: string
          ip_address: string | null
          page_type: string | null
          referrer: string | null
          timestamp: string
          user_agent: string | null
          utm_campaign: string | null
          utm_source: string | null
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          ip_address?: string | null
          page_type?: string | null
          referrer?: string | null
          timestamp?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          page_type?: string | null
          referrer?: string | null
          timestamp?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      partner_cta_clicks: {
        Row: {
          clicked_at: string
          created_at: string
          id: string
          source_section: string
          user_id: string | null
        }
        Insert: {
          clicked_at?: string
          created_at?: string
          id?: string
          source_section?: string
          user_id?: string | null
        }
        Update: {
          clicked_at?: string
          created_at?: string
          id?: string
          source_section?: string
          user_id?: string | null
        }
        Relationships: []
      }
      partnership_analytics: {
        Row: {
          city: string | null
          event_type: string
          id: string
          job_type: string | null
          metadata: Json | null
          partner_id: string
          partner_type: string
          timestamp: string
        }
        Insert: {
          city?: string | null
          event_type: string
          id?: string
          job_type?: string | null
          metadata?: Json | null
          partner_id: string
          partner_type: string
          timestamp?: string
        }
        Update: {
          city?: string | null
          event_type?: string
          id?: string
          job_type?: string | null
          metadata?: Json | null
          partner_id?: string
          partner_type?: string
          timestamp?: string
        }
        Relationships: []
      }
      pattern_analysis_events: {
        Row: {
          analysis_type: string
          confidence_scores: Json | null
          created_at: string
          id: string
          insights_generated: Json | null
          patterns_extracted: Json | null
          processing_time_ms: number | null
          test_id: string
          user_id: string
        }
        Insert: {
          analysis_type: string
          confidence_scores?: Json | null
          created_at?: string
          id?: string
          insights_generated?: Json | null
          patterns_extracted?: Json | null
          processing_time_ms?: number | null
          test_id: string
          user_id: string
        }
        Update: {
          analysis_type?: string
          confidence_scores?: Json | null
          created_at?: string
          id?: string
          insights_generated?: Json | null
          patterns_extracted?: Json | null
          processing_time_ms?: number | null
          test_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pattern_analysis_events_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "caption_ab_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      payout_requests: {
        Row: {
          admin_notes: string | null
          amount_cents: number | null
          approved_at: string | null
          barber_id: string | null
          id: string
          paid_at: string | null
          payment_method: string
          payout_email: string
          rejected_at: string | null
          requested_at: string
          status: string
          stripe_account_id: string | null
          stripe_transfer_id: string | null
          total_amount: number
          updated_at: string
          user_id: string
          video_ids: string[]
        }
        Insert: {
          admin_notes?: string | null
          amount_cents?: number | null
          approved_at?: string | null
          barber_id?: string | null
          id?: string
          paid_at?: string | null
          payment_method?: string
          payout_email: string
          rejected_at?: string | null
          requested_at?: string
          status?: string
          stripe_account_id?: string | null
          stripe_transfer_id?: string | null
          total_amount: number
          updated_at?: string
          user_id: string
          video_ids: string[]
        }
        Update: {
          admin_notes?: string | null
          amount_cents?: number | null
          approved_at?: string | null
          barber_id?: string | null
          id?: string
          paid_at?: string | null
          payment_method?: string
          payout_email?: string
          rejected_at?: string | null
          requested_at?: string
          status?: string
          stripe_account_id?: string | null
          stripe_transfer_id?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string
          video_ids?: string[]
        }
        Relationships: []
      }
      payout_settings: {
        Row: {
          created_at: string | null
          fraud_tolerance: number | null
          id: string
          is_active: boolean | null
          max_daily_earnings: number | null
          min_withdrawal: number | null
          payout_per_1000_views: number | null
          payout_per_click: number | null
          platform: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          fraud_tolerance?: number | null
          id?: string
          is_active?: boolean | null
          max_daily_earnings?: number | null
          min_withdrawal?: number | null
          payout_per_1000_views?: number | null
          payout_per_click?: number | null
          platform: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          fraud_tolerance?: number | null
          id?: string
          is_active?: boolean | null
          max_daily_earnings?: number | null
          min_withdrawal?: number | null
          payout_per_1000_views?: number | null
          payout_per_click?: number | null
          platform?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      phone_number_pool: {
        Row: {
          created_at: string
          id: string
          last_used_at: string | null
          phone_number: string
          provider: string
          status: string | null
          usage_count: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          last_used_at?: string | null
          phone_number: string
          provider: string
          status?: string | null
          usage_count?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          last_used_at?: string | null
          phone_number?: string
          provider?: string
          status?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      plan_expiry_notifications: {
        Row: {
          barber_id: string
          client_id: string
          created_at: string | null
          days_before_expiry: number
          email_sent: boolean | null
          expiry_date: string
          gpt_message_id: string | null
          id: string
          notification_sent: boolean | null
          plan_id: string
          sms_sent: boolean | null
          updated_at: string | null
        }
        Insert: {
          barber_id: string
          client_id: string
          created_at?: string | null
          days_before_expiry: number
          email_sent?: boolean | null
          expiry_date: string
          gpt_message_id?: string | null
          id?: string
          notification_sent?: boolean | null
          plan_id: string
          sms_sent?: boolean | null
          updated_at?: string | null
        }
        Update: {
          barber_id?: string
          client_id?: string
          created_at?: string | null
          days_before_expiry?: number
          email_sent?: boolean | null
          expiry_date?: string
          gpt_message_id?: string | null
          id?: string
          notification_sent?: boolean | null
          plan_id?: string
          sms_sent?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_plan_expiry_notifications_barber"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "fk_plan_expiry_notifications_barber"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_plan_expiry_notifications_barber"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "fk_plan_expiry_notifications_barber"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "fk_plan_expiry_notifications_barber"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "fk_plan_expiry_notifications_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client_appointment_patterns"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "fk_plan_expiry_notifications_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_plan_expiry_notifications_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "cut_streak_leaderboard"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "fk_plan_expiry_notifications_plan"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "barber_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plan_expiry_notifications_gpt_message_id_fkey"
            columns: ["gpt_message_id"]
            isOneToOne: false
            referencedRelation: "gpt_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      pod_activities: {
        Row: {
          activity_data: Json | null
          activity_type: string
          created_at: string
          id: string
          pod_id: string
          user_id: string
          xp_earned: number | null
        }
        Insert: {
          activity_data?: Json | null
          activity_type: string
          created_at?: string
          id?: string
          pod_id: string
          user_id: string
          xp_earned?: number | null
        }
        Update: {
          activity_data?: Json | null
          activity_type?: string
          created_at?: string
          id?: string
          pod_id?: string
          user_id?: string
          xp_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pod_activities_pod_id_fkey"
            columns: ["pod_id"]
            isOneToOne: false
            referencedRelation: "pods"
            referencedColumns: ["id"]
          },
        ]
      }
      pod_analytics: {
        Row: {
          collaboration_count: number | null
          created_at: string
          id: string
          period_end: string
          period_start: string
          pod_id: string
          total_earnings: number | null
          total_remixes: number | null
          total_views: number | null
          viral_score: number | null
        }
        Insert: {
          collaboration_count?: number | null
          created_at?: string
          id?: string
          period_end: string
          period_start: string
          pod_id: string
          total_earnings?: number | null
          total_remixes?: number | null
          total_views?: number | null
          viral_score?: number | null
        }
        Update: {
          collaboration_count?: number | null
          created_at?: string
          id?: string
          period_end?: string
          period_start?: string
          pod_id?: string
          total_earnings?: number | null
          total_remixes?: number | null
          total_views?: number | null
          viral_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pod_analytics_pod_id_fkey"
            columns: ["pod_id"]
            isOneToOne: false
            referencedRelation: "pods"
            referencedColumns: ["id"]
          },
        ]
      }
      pod_earnings: {
        Row: {
          created_at: string
          distributed_at: string | null
          distribution_data: Json | null
          earning_source_id: string | null
          id: string
          pod_id: string
          status: string
          total_amount: number
        }
        Insert: {
          created_at?: string
          distributed_at?: string | null
          distribution_data?: Json | null
          earning_source_id?: string | null
          id?: string
          pod_id: string
          status?: string
          total_amount?: number
        }
        Update: {
          created_at?: string
          distributed_at?: string | null
          distribution_data?: Json | null
          earning_source_id?: string | null
          id?: string
          pod_id?: string
          status?: string
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "pod_earnings_pod_id_fkey"
            columns: ["pod_id"]
            isOneToOne: false
            referencedRelation: "pods"
            referencedColumns: ["id"]
          },
        ]
      }
      pod_invitations: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          invitee_id: string
          inviter_id: string
          message: string | null
          pod_id: string
          status: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          invitee_id: string
          inviter_id: string
          message?: string | null
          pod_id: string
          status?: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          invitee_id?: string
          inviter_id?: string
          message?: string | null
          pod_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "pod_invitations_pod_id_fkey"
            columns: ["pod_id"]
            isOneToOne: false
            referencedRelation: "pods"
            referencedColumns: ["id"]
          },
        ]
      }
      pod_members: {
        Row: {
          earnings_percentage: number | null
          id: string
          is_active: boolean | null
          joined_at: string
          pod_id: string
          role: string
          total_contributions: number | null
          user_id: string
        }
        Insert: {
          earnings_percentage?: number | null
          id?: string
          is_active?: boolean | null
          joined_at?: string
          pod_id: string
          role?: string
          total_contributions?: number | null
          user_id: string
        }
        Update: {
          earnings_percentage?: number | null
          id?: string
          is_active?: boolean | null
          joined_at?: string
          pod_id?: string
          role?: string
          total_contributions?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pod_members_pod_id_fkey"
            columns: ["pod_id"]
            isOneToOne: false
            referencedRelation: "pods"
            referencedColumns: ["id"]
          },
        ]
      }
      pods: {
        Row: {
          created_at: string
          creator_id: string
          description: string | null
          earnings_split_data: Json | null
          earnings_split_type: string
          id: string
          invite_code: string | null
          is_active: boolean | null
          is_public: boolean | null
          max_members: number
          name: string
          pod_avatar_url: string | null
          prestige_multiplier: number | null
          total_pod_xp: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          description?: string | null
          earnings_split_data?: Json | null
          earnings_split_type?: string
          id?: string
          invite_code?: string | null
          is_active?: boolean | null
          is_public?: boolean | null
          max_members?: number
          name: string
          pod_avatar_url?: string | null
          prestige_multiplier?: number | null
          total_pod_xp?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          description?: string | null
          earnings_split_data?: Json | null
          earnings_split_type?: string
          id?: string
          invite_code?: string | null
          is_active?: boolean | null
          is_public?: boolean | null
          max_members?: number
          name?: string
          pod_avatar_url?: string | null
          prestige_multiplier?: number | null
          total_pod_xp?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      posted_jobs: {
        Row: {
          craigslist_post_id: string | null
          created_at: string
          id: string
          job_to_post_id: string | null
          post_url: string | null
          posted_at: string
          status: string | null
        }
        Insert: {
          craigslist_post_id?: string | null
          created_at?: string
          id?: string
          job_to_post_id?: string | null
          post_url?: string | null
          posted_at?: string
          status?: string | null
        }
        Update: {
          craigslist_post_id?: string | null
          created_at?: string
          id?: string
          job_to_post_id?: string | null
          post_url?: string | null
          posted_at?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posted_jobs_job_to_post_id_fkey"
            columns: ["job_to_post_id"]
            isOneToOne: false
            referencedRelation: "jobs_to_post"
            referencedColumns: ["id"]
          },
        ]
      }
      posting_insights: {
        Row: {
          best_language: string | null
          best_posting_time: string | null
          best_tone: string | null
          city: string
          confidence_score: number | null
          created_at: string
          id: string
          insights_data: Json | null
          job_type: string
          last_analyzed: string | null
          peak_days: string[] | null
          scan_rate_multiplier: number | null
        }
        Insert: {
          best_language?: string | null
          best_posting_time?: string | null
          best_tone?: string | null
          city: string
          confidence_score?: number | null
          created_at?: string
          id?: string
          insights_data?: Json | null
          job_type: string
          last_analyzed?: string | null
          peak_days?: string[] | null
          scan_rate_multiplier?: number | null
        }
        Update: {
          best_language?: string | null
          best_posting_time?: string | null
          best_tone?: string | null
          city?: string
          confidence_score?: number | null
          created_at?: string
          id?: string
          insights_data?: Json | null
          job_type?: string
          last_analyzed?: string | null
          peak_days?: string[] | null
          scan_rate_multiplier?: number | null
        }
        Relationships: []
      }
      price_alerts: {
        Row: {
          alert_type: string | null
          created_at: string
          current_price: number | null
          id: string
          is_active: boolean | null
          last_checked: string | null
          notification_sent: boolean | null
          product_id: string
          supplier: string
          target_price: number
          triggered_at: string | null
          user_id: string
        }
        Insert: {
          alert_type?: string | null
          created_at?: string
          current_price?: number | null
          id?: string
          is_active?: boolean | null
          last_checked?: string | null
          notification_sent?: boolean | null
          product_id: string
          supplier: string
          target_price: number
          triggered_at?: string | null
          user_id: string
        }
        Update: {
          alert_type?: string | null
          created_at?: string
          current_price?: number | null
          id?: string
          is_active?: boolean | null
          last_checked?: string | null
          notification_sent?: boolean | null
          product_id?: string
          supplier?: string
          target_price?: number
          triggered_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      price_history: {
        Row: {
          created_at: string
          data_source: string | null
          id: string
          original_price: number | null
          price: number
          product_id: string
          recorded_at: string
          supplier: string
        }
        Insert: {
          created_at?: string
          data_source?: string | null
          id?: string
          original_price?: number | null
          price: number
          product_id: string
          recorded_at?: string
          supplier: string
        }
        Update: {
          created_at?: string
          data_source?: string | null
          id?: string
          original_price?: number | null
          price?: number
          product_id?: string
          recorded_at?: string
          supplier?: string
        }
        Relationships: []
      }
      product_comments: {
        Row: {
          comment_text: string
          commenter_id: string
          created_at: string
          id: string
          session_product_id: string
        }
        Insert: {
          comment_text: string
          commenter_id: string
          created_at?: string
          id?: string
          session_product_id: string
        }
        Update: {
          comment_text?: string
          commenter_id?: string
          created_at?: string
          id?: string
          session_product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_comments_session_product_id_fkey"
            columns: ["session_product_id"]
            isOneToOne: false
            referencedRelation: "session_products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_votes: {
        Row: {
          created_at: string
          id: string
          session_product_id: string
          vote_type: string
          voter_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          session_product_id: string
          vote_type: string
          voter_id: string
        }
        Update: {
          created_at?: string
          id?: string
          session_product_id?: string
          vote_type?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_votes_session_product_id_fkey"
            columns: ["session_product_id"]
            isOneToOne: false
            referencedRelation: "session_products"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          badge: string | null
          badges_unlocked: string[] | null
          business_name: string | null
          company_name: string | null
          created_at: string
          cut_streak: number | null
          earnings_goal: number | null
          full_name: string | null
          gpt_caption_clicks: number | null
          has_completed_activation: boolean | null
          hiring_frequency: string | null
          id: string
          industry: string | null
          instagram_handle: string | null
          job_type: string | null
          language_pref: string | null
          language_preference: string | null
          last_applied_at: string | null
          last_streak_update: string | null
          location: string | null
          match_strategy: string | null
          min_pay: string | null
          no_show_recovery_attempts: number | null
          onboarding_completed: boolean | null
          phone: string | null
          preferences: Json | null
          profile_image_url: string | null
          ranking_points: number | null
          referral_code: string | null
          referral_count: number | null
          referral_earnings: number | null
          referral_source: string | null
          referral_type: string | null
          referrals_count: number | null
          referred_by: string | null
          referred_by_id: string | null
          role: string | null
          schedule: string | null
          specialties: string[] | null
          status: string | null
          stripe_account_id: string | null
          stripe_onboarding_completed: boolean | null
          team_size: string | null
          tiktok_handle: string | null
          total_earnings: number | null
          updated_at: string
          user_type: string | null
          years_experience: number | null
        }
        Insert: {
          badge?: string | null
          badges_unlocked?: string[] | null
          business_name?: string | null
          company_name?: string | null
          created_at?: string
          cut_streak?: number | null
          earnings_goal?: number | null
          full_name?: string | null
          gpt_caption_clicks?: number | null
          has_completed_activation?: boolean | null
          hiring_frequency?: string | null
          id: string
          industry?: string | null
          instagram_handle?: string | null
          job_type?: string | null
          language_pref?: string | null
          language_preference?: string | null
          last_applied_at?: string | null
          last_streak_update?: string | null
          location?: string | null
          match_strategy?: string | null
          min_pay?: string | null
          no_show_recovery_attempts?: number | null
          onboarding_completed?: boolean | null
          phone?: string | null
          preferences?: Json | null
          profile_image_url?: string | null
          ranking_points?: number | null
          referral_code?: string | null
          referral_count?: number | null
          referral_earnings?: number | null
          referral_source?: string | null
          referral_type?: string | null
          referrals_count?: number | null
          referred_by?: string | null
          referred_by_id?: string | null
          role?: string | null
          schedule?: string | null
          specialties?: string[] | null
          status?: string | null
          stripe_account_id?: string | null
          stripe_onboarding_completed?: boolean | null
          team_size?: string | null
          tiktok_handle?: string | null
          total_earnings?: number | null
          updated_at?: string
          user_type?: string | null
          years_experience?: number | null
        }
        Update: {
          badge?: string | null
          badges_unlocked?: string[] | null
          business_name?: string | null
          company_name?: string | null
          created_at?: string
          cut_streak?: number | null
          earnings_goal?: number | null
          full_name?: string | null
          gpt_caption_clicks?: number | null
          has_completed_activation?: boolean | null
          hiring_frequency?: string | null
          id?: string
          industry?: string | null
          instagram_handle?: string | null
          job_type?: string | null
          language_pref?: string | null
          language_preference?: string | null
          last_applied_at?: string | null
          last_streak_update?: string | null
          location?: string | null
          match_strategy?: string | null
          min_pay?: string | null
          no_show_recovery_attempts?: number | null
          onboarding_completed?: boolean | null
          phone?: string | null
          preferences?: Json | null
          profile_image_url?: string | null
          ranking_points?: number | null
          referral_code?: string | null
          referral_count?: number | null
          referral_earnings?: number | null
          referral_source?: string | null
          referral_type?: string | null
          referrals_count?: number | null
          referred_by?: string | null
          referred_by_id?: string | null
          role?: string | null
          schedule?: string | null
          specialties?: string[] | null
          status?: string | null
          stripe_account_id?: string | null
          stripe_onboarding_completed?: boolean | null
          team_size?: string | null
          tiktok_handle?: string | null
          total_earnings?: number | null
          updated_at?: string
          user_type?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_id_fkey"
            columns: ["referred_by_id"]
            isOneToOne: false
            referencedRelation: "barber_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_referred_by_id_fkey"
            columns: ["referred_by_id"]
            isOneToOne: false
            referencedRelation: "client_streak_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_referred_by_id_fkey"
            columns: ["referred_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      Profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          user_type: string
        }
        Insert: {
          created_at: string
          full_name: string
          id?: string
          user_type: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          user_type?: string
        }
        Relationships: []
      }
      profit_tracking: {
        Row: {
          amount_earned: number
          barber_id: string
          client_id: string
          created_at: string
          cut_type: string | null
          id: string
          notes: string | null
          source: string | null
          transaction_date: string
          updated_at: string
        }
        Insert: {
          amount_earned: number
          barber_id: string
          client_id: string
          created_at?: string
          cut_type?: string | null
          id?: string
          notes?: string | null
          source?: string | null
          transaction_date?: string
          updated_at?: string
        }
        Update: {
          amount_earned?: number
          barber_id?: string
          client_id?: string
          created_at?: string
          cut_type?: string | null
          id?: string
          notes?: string | null
          source?: string | null
          transaction_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profit_tracking_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "profit_tracking_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profit_tracking_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "profit_tracking_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "profit_tracking_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "profit_tracking_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client_appointment_patterns"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "profit_tracking_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profit_tracking_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "cut_streak_leaderboard"
            referencedColumns: ["client_id"]
          },
        ]
      }
      promo_video_shares: {
        Row: {
          barber_id: string
          id: string
          platform: string
          shared_at: string
        }
        Insert: {
          barber_id: string
          id?: string
          platform: string
          shared_at?: string
        }
        Update: {
          barber_id?: string
          id?: string
          platform?: string
          shared_at?: string
        }
        Relationships: []
      }
      promo_video_views: {
        Row: {
          barber_id: string
          id: string
          viewed_at: string
        }
        Insert: {
          barber_id: string
          id?: string
          viewed_at?: string
        }
        Update: {
          barber_id?: string
          id?: string
          viewed_at?: string
        }
        Relationships: []
      }
      promoter_earnings: {
        Row: {
          created_at: string | null
          earnings_amount: number | null
          earnings_type: string | null
          id: string
          paid_at: string | null
          promoter_id: string
          status: string | null
          user_attribution_id: string | null
        }
        Insert: {
          created_at?: string | null
          earnings_amount?: number | null
          earnings_type?: string | null
          id?: string
          paid_at?: string | null
          promoter_id: string
          status?: string | null
          user_attribution_id?: string | null
        }
        Update: {
          created_at?: string | null
          earnings_amount?: number | null
          earnings_type?: string | null
          id?: string
          paid_at?: string | null
          promoter_id?: string
          status?: string | null
          user_attribution_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promoter_earnings_user_attribution_id_fkey"
            columns: ["user_attribution_id"]
            isOneToOne: false
            referencedRelation: "user_attributions"
            referencedColumns: ["id"]
          },
        ]
      }
      promoter_payouts: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          processed_at: string | null
          promoter_id: string | null
          requested_at: string | null
          signups_count: number | null
          status: string | null
          stripe_transfer_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          processed_at?: string | null
          promoter_id?: string | null
          requested_at?: string | null
          signups_count?: number | null
          status?: string | null
          stripe_transfer_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          processed_at?: string | null
          promoter_id?: string | null
          requested_at?: string | null
          signups_count?: number | null
          status?: string | null
          stripe_transfer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promoter_payouts_promoter_id_fkey"
            columns: ["promoter_id"]
            isOneToOne: false
            referencedRelation: "promoters"
            referencedColumns: ["id"]
          },
        ]
      }
      promoters: {
        Row: {
          badge_level: string | null
          created_at: string | null
          current_rank: number | null
          email: string
          id: string
          is_active: boolean | null
          phone: string | null
          qr_code_url: string | null
          referral_code: string | null
          stripe_account_id: string | null
          total_earnings: number | null
          total_scans: number | null
          total_signups: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          badge_level?: string | null
          created_at?: string | null
          current_rank?: number | null
          email: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          qr_code_url?: string | null
          referral_code?: string | null
          stripe_account_id?: string | null
          total_earnings?: number | null
          total_scans?: number | null
          total_signups?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          badge_level?: string | null
          created_at?: string | null
          current_rank?: number | null
          email?: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          qr_code_url?: string | null
          referral_code?: string | null
          stripe_account_id?: string | null
          total_earnings?: number | null
          total_scans?: number | null
          total_signups?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      promotion_queue: {
        Row: {
          city: string
          created_at: string
          error_message: string | null
          id: string
          job_id: string
          platform: string
          processed_at: string | null
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          city: string
          created_at?: string
          error_message?: string | null
          id?: string
          job_id: string
          platform: string
          processed_at?: string | null
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          city?: string
          created_at?: string
          error_message?: string | null
          id?: string
          job_id?: string
          platform?: string
          processed_at?: string | null
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "promotion_queue_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "real_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_interactions: {
        Row: {
          created_at: string
          id: string
          interaction_type: string
          prompt_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          interaction_type: string
          prompt_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          interaction_type?: string
          prompt_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompt_interactions_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_packs: {
        Row: {
          category: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          price: number
          public: boolean | null
          tags: string[] | null
          title: string
          total_prompts: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          price?: number
          public?: boolean | null
          tags?: string[] | null
          title: string
          total_prompts?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          price?: number
          public?: boolean | null
          tags?: string[] | null
          title?: string
          total_prompts?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      prompt_variants: {
        Row: {
          city_size: string
          created_at: string
          id: string
          job_type: string
          priority: number
          prompt_template: string
          region: string
          tone: string
          updated_at: string
        }
        Insert: {
          city_size: string
          created_at?: string
          id?: string
          job_type: string
          priority?: number
          prompt_template: string
          region: string
          tone?: string
          updated_at?: string
        }
        Update: {
          city_size?: string
          created_at?: string
          id?: string
          job_type?: string
          priority?: number
          prompt_template?: string
          region?: string
          tone?: string
          updated_at?: string
        }
        Relationships: []
      }
      prompts: {
        Row: {
          category: string | null
          content: string
          copies: number | null
          created_at: string
          difficulty_level: string | null
          estimated_time: number | null
          id: string
          is_premium: boolean | null
          price: number | null
          public: boolean | null
          tags: string[] | null
          title: string
          tool_type: string | null
          updated_at: string
          user_id: string
          views: number | null
        }
        Insert: {
          category?: string | null
          content: string
          copies?: number | null
          created_at?: string
          difficulty_level?: string | null
          estimated_time?: number | null
          id?: string
          is_premium?: boolean | null
          price?: number | null
          public?: boolean | null
          tags?: string[] | null
          title: string
          tool_type?: string | null
          updated_at?: string
          user_id: string
          views?: number | null
        }
        Update: {
          category?: string | null
          content?: string
          copies?: number | null
          created_at?: string
          difficulty_level?: string | null
          estimated_time?: number | null
          id?: string
          is_premium?: boolean | null
          price?: number | null
          public?: boolean | null
          tags?: string[] | null
          title?: string
          tool_type?: string | null
          updated_at?: string
          user_id?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_prompts_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "barber_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_prompts_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "client_streak_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_prompts_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      push_failures: {
        Row: {
          alert_id: string | null
          created_at: string
          error_code: string | null
          error_message: string
          id: string
          resolved_at: string | null
          retry_count: number | null
          user_id: string
        }
        Insert: {
          alert_id?: string | null
          created_at?: string
          error_code?: string | null
          error_message: string
          id?: string
          resolved_at?: string | null
          retry_count?: number | null
          user_id: string
        }
        Update: {
          alert_id?: string | null
          created_at?: string
          error_code?: string | null
          error_message?: string
          id?: string
          resolved_at?: string | null
          retry_count?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_failures_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "remix_rank_alerts"
            referencedColumns: ["id"]
          },
        ]
      }
      qr_flyer_generations: {
        Row: {
          barber_id: string
          generated_at: string
          id: string
          referral_url: string
        }
        Insert: {
          barber_id: string
          generated_at?: string
          id?: string
          referral_url: string
        }
        Update: {
          barber_id?: string
          generated_at?: string
          id?: string
          referral_url?: string
        }
        Relationships: []
      }
      qr_flyer_signups: {
        Row: {
          created_at: string | null
          earnings_amount: number | null
          flyer_id: string | null
          fraud_score: number | null
          id: string
          ip_address: string | null
          is_valid: boolean | null
          payout_processed: boolean | null
          promoter_id: string | null
          scan_timestamp: string | null
          signup_timestamp: string | null
          signup_user_id: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          earnings_amount?: number | null
          flyer_id?: string | null
          fraud_score?: number | null
          id?: string
          ip_address?: string | null
          is_valid?: boolean | null
          payout_processed?: boolean | null
          promoter_id?: string | null
          scan_timestamp?: string | null
          signup_timestamp?: string | null
          signup_user_id?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          earnings_amount?: number | null
          flyer_id?: string | null
          fraud_score?: number | null
          id?: string
          ip_address?: string | null
          is_valid?: boolean | null
          payout_processed?: boolean | null
          promoter_id?: string | null
          scan_timestamp?: string | null
          signup_timestamp?: string | null
          signup_user_id?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qr_flyer_signups_flyer_id_fkey"
            columns: ["flyer_id"]
            isOneToOne: false
            referencedRelation: "qr_flyers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qr_flyer_signups_promoter_id_fkey"
            columns: ["promoter_id"]
            isOneToOne: false
            referencedRelation: "promoters"
            referencedColumns: ["id"]
          },
        ]
      }
      qr_flyers: {
        Row: {
          caption_id: string | null
          caption_text: string | null
          city: string
          created_at: string | null
          download_count: number | null
          flyer_style: string
          generated_link: string
          id: string
          job_type: string
          language: string
          poster_image_url: string | null
          promoter_id: string | null
          qr_code_image_url: string | null
          scan_count: number | null
          short_link: string | null
          signup_count: number | null
          updated_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          caption_id?: string | null
          caption_text?: string | null
          city: string
          created_at?: string | null
          download_count?: number | null
          flyer_style?: string
          generated_link: string
          id?: string
          job_type: string
          language?: string
          poster_image_url?: string | null
          promoter_id?: string | null
          qr_code_image_url?: string | null
          scan_count?: number | null
          short_link?: string | null
          signup_count?: number | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          caption_id?: string | null
          caption_text?: string | null
          city?: string
          created_at?: string | null
          download_count?: number | null
          flyer_style?: string
          generated_link?: string
          id?: string
          job_type?: string
          language?: string
          poster_image_url?: string | null
          promoter_id?: string | null
          qr_code_image_url?: string | null
          scan_count?: number | null
          short_link?: string | null
          signup_count?: number | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      qr_poster_scans: {
        Row: {
          converted_to_signup: boolean | null
          flyer_id: string | null
          id: string
          metadata: Json | null
          scanned_at: string | null
          scanner_ip: string | null
          scanner_location: string | null
          signup_at: string | null
          user_agent: string | null
        }
        Insert: {
          converted_to_signup?: boolean | null
          flyer_id?: string | null
          id?: string
          metadata?: Json | null
          scanned_at?: string | null
          scanner_ip?: string | null
          scanner_location?: string | null
          signup_at?: string | null
          user_agent?: string | null
        }
        Update: {
          converted_to_signup?: boolean | null
          flyer_id?: string | null
          id?: string
          metadata?: Json | null
          scanned_at?: string | null
          scanner_ip?: string | null
          scanner_location?: string | null
          signup_at?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qr_poster_scans_flyer_id_fkey"
            columns: ["flyer_id"]
            isOneToOne: false
            referencedRelation: "qr_flyers"
            referencedColumns: ["id"]
          },
        ]
      }
      qr_scans: {
        Row: {
          city: string
          created_at: string
          device_type: string | null
          id: string
          ip_address: string | null
          ref_source: string
          referrer: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          city: string
          created_at?: string
          device_type?: string | null
          id?: string
          ip_address?: string | null
          ref_source?: string
          referrer?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          city?: string
          created_at?: string
          device_type?: string | null
          id?: string
          ip_address?: string | null
          ref_source?: string
          referrer?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      qr_sms_logs: {
        Row: {
          city: string
          created_at: string
          id: string
          job_type: string
          phone_number: string
          qr_scan_id: string | null
          sms_delivery_status: string | null
          sms_message: string | null
          sms_sent: boolean | null
          updated_at: string
          utm_param: string | null
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          job_type: string
          phone_number: string
          qr_scan_id?: string | null
          sms_delivery_status?: string | null
          sms_message?: string | null
          sms_sent?: boolean | null
          updated_at?: string
          utm_param?: string | null
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          job_type?: string
          phone_number?: string
          qr_scan_id?: string | null
          sms_delivery_status?: string | null
          sms_message?: string | null
          sms_sent?: boolean | null
          updated_at?: string
          utm_param?: string | null
        }
        Relationships: []
      }
      qr_traffic_logs: {
        Row: {
          action_type: string
          city: string
          created_at: string
          flyer_id: string | null
          id: string
          ip_address: string | null
          job_type: string
          latitude: number | null
          longitude: number | null
          scan_timestamp: string | null
          scanned_at: string
          source: string | null
          state: string | null
          user_agent: string | null
          utm_params: Json | null
        }
        Insert: {
          action_type?: string
          city: string
          created_at?: string
          flyer_id?: string | null
          id?: string
          ip_address?: string | null
          job_type: string
          latitude?: number | null
          longitude?: number | null
          scan_timestamp?: string | null
          scanned_at?: string
          source?: string | null
          state?: string | null
          user_agent?: string | null
          utm_params?: Json | null
        }
        Update: {
          action_type?: string
          city?: string
          created_at?: string
          flyer_id?: string | null
          id?: string
          ip_address?: string | null
          job_type?: string
          latitude?: number | null
          longitude?: number | null
          scan_timestamp?: string | null
          scanned_at?: string
          source?: string | null
          state?: string | null
          user_agent?: string | null
          utm_params?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "qr_traffic_logs_flyer_id_fkey"
            columns: ["flyer_id"]
            isOneToOne: false
            referencedRelation: "flyer_exports"
            referencedColumns: ["id"]
          },
        ]
      }
      real_jobs: {
        Row: {
          applicant_count: number | null
          apply_url: string
          boosted: boolean | null
          boosted_at: string | null
          city: string
          company_name: string
          country: string
          created_at: string
          id: string
          industry: string | null
          is_auto_promoted: boolean | null
          is_boosted: boolean | null
          job_title: string
          job_type: string
          promoted_at: string | null
          promotion_source: string | null
          salary_range: string | null
          state: string
          tags: string[] | null
        }
        Insert: {
          applicant_count?: number | null
          apply_url: string
          boosted?: boolean | null
          boosted_at?: string | null
          city: string
          company_name: string
          country?: string
          created_at?: string
          id?: string
          industry?: string | null
          is_auto_promoted?: boolean | null
          is_boosted?: boolean | null
          job_title: string
          job_type: string
          promoted_at?: string | null
          promotion_source?: string | null
          salary_range?: string | null
          state: string
          tags?: string[] | null
        }
        Update: {
          applicant_count?: number | null
          apply_url?: string
          boosted?: boolean | null
          boosted_at?: string | null
          city?: string
          company_name?: string
          country?: string
          created_at?: string
          id?: string
          industry?: string | null
          is_auto_promoted?: boolean | null
          is_boosted?: boolean | null
          job_title?: string
          job_type?: string
          promoted_at?: string | null
          promotion_source?: string | null
          salary_range?: string | null
          state?: string
          tags?: string[] | null
        }
        Relationships: []
      }
      rebook_nudge_campaigns: {
        Row: {
          barber_id: string
          campaign_name: string
          created_at: string
          id: string
          is_active: boolean | null
          last_run_at: string | null
          message_template: string
          next_run_at: string | null
          nudge_type: string
          send_time: string | null
          target_urgency_threshold: number | null
          total_booked: number | null
          total_clicked: number | null
          total_opened: number | null
          total_sent: number | null
          updated_at: string
        }
        Insert: {
          barber_id: string
          campaign_name: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          message_template: string
          next_run_at?: string | null
          nudge_type: string
          send_time?: string | null
          target_urgency_threshold?: number | null
          total_booked?: number | null
          total_clicked?: number | null
          total_opened?: number | null
          total_sent?: number | null
          updated_at?: string
        }
        Update: {
          barber_id?: string
          campaign_name?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          message_template?: string
          next_run_at?: string | null
          nudge_type?: string
          send_time?: string | null
          target_urgency_threshold?: number | null
          total_booked?: number | null
          total_clicked?: number | null
          total_opened?: number | null
          total_sent?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      rebook_suggestions: {
        Row: {
          avg_days_between_cuts: number | null
          barber_id: string
          booked_appointment_id: string | null
          client_id: string
          conversion_tracked: boolean | null
          created_at: string
          generated_by: string | null
          id: string
          last_cut_date: string | null
          model_version: string | null
          preferred_day_of_week: number | null
          preferred_time_slot: string | null
          prompt_data: Json | null
          recommended_date: string
          responded_at: string | null
          sent_at: string | null
          status: string
          suggested_message: string
          total_appointments: number | null
          updated_at: string
          urgency_score: number
        }
        Insert: {
          avg_days_between_cuts?: number | null
          barber_id: string
          booked_appointment_id?: string | null
          client_id: string
          conversion_tracked?: boolean | null
          created_at?: string
          generated_by?: string | null
          id?: string
          last_cut_date?: string | null
          model_version?: string | null
          preferred_day_of_week?: number | null
          preferred_time_slot?: string | null
          prompt_data?: Json | null
          recommended_date: string
          responded_at?: string | null
          sent_at?: string | null
          status?: string
          suggested_message: string
          total_appointments?: number | null
          updated_at?: string
          urgency_score?: number
        }
        Update: {
          avg_days_between_cuts?: number | null
          barber_id?: string
          booked_appointment_id?: string | null
          client_id?: string
          conversion_tracked?: boolean | null
          created_at?: string
          generated_by?: string | null
          id?: string
          last_cut_date?: string | null
          model_version?: string | null
          preferred_day_of_week?: number | null
          preferred_time_slot?: string | null
          prompt_data?: Json | null
          recommended_date?: string
          responded_at?: string | null
          sent_at?: string | null
          status?: string
          suggested_message?: string
          total_appointments?: number | null
          updated_at?: string
          urgency_score?: number
        }
        Relationships: []
      }
      rebooking_ab_tests: {
        Row: {
          appointment_id: string | null
          barber_id: string
          booked_at: string | null
          channel: string
          clicked_a: boolean | null
          clicked_b: boolean | null
          client_id: string
          created_at: string | null
          id: string
          opened_a: boolean | null
          opened_b: boolean | null
          result: string | null
          sent_at: string | null
          suggestion_id: string | null
          updated_at: string | null
          variant_a: string
          variant_b: string
          variant_sent: string
        }
        Insert: {
          appointment_id?: string | null
          barber_id: string
          booked_at?: string | null
          channel: string
          clicked_a?: boolean | null
          clicked_b?: boolean | null
          client_id: string
          created_at?: string | null
          id?: string
          opened_a?: boolean | null
          opened_b?: boolean | null
          result?: string | null
          sent_at?: string | null
          suggestion_id?: string | null
          updated_at?: string | null
          variant_a: string
          variant_b: string
          variant_sent: string
        }
        Update: {
          appointment_id?: string | null
          barber_id?: string
          booked_at?: string | null
          channel?: string
          clicked_a?: boolean | null
          clicked_b?: boolean | null
          client_id?: string
          created_at?: string | null
          id?: string
          opened_a?: boolean | null
          opened_b?: boolean | null
          result?: string | null
          sent_at?: string | null
          suggestion_id?: string | null
          updated_at?: string | null
          variant_a?: string
          variant_b?: string
          variant_sent?: string
        }
        Relationships: []
      }
      rebooking_messages: {
        Row: {
          barber_id: string
          client_id: string
          created_at: string
          id: string
          message_text: string
          response_received: boolean | null
          scheduled_for: string
          sent_at: string | null
        }
        Insert: {
          barber_id: string
          client_id: string
          created_at?: string
          id?: string
          message_text: string
          response_received?: boolean | null
          scheduled_for: string
          sent_at?: string | null
        }
        Update: {
          barber_id?: string
          client_id?: string
          created_at?: string
          id?: string
          message_text?: string
          response_received?: boolean | null
          scheduled_for?: string
          sent_at?: string | null
        }
        Relationships: []
      }
      recent_hires: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string | null
          hire_name: string
          hired_at: string | null
          id: string
          job_type: string
          location: string
          salary_offered: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          hire_name: string
          hired_at?: string | null
          id?: string
          job_type: string
          location: string
          salary_offered?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          hire_name?: string
          hired_at?: string | null
          id?: string
          job_type?: string
          location?: string
          salary_offered?: string | null
        }
        Relationships: []
      }
      referral_bonuses: {
        Row: {
          barber_id: string
          created_at: string | null
          id: string
          paid_bonus: number | null
          pending_bonus: number | null
          total_barber_referrals: number | null
          total_bonus_earned: number | null
          total_client_referrals: number | null
          updated_at: string | null
        }
        Insert: {
          barber_id: string
          created_at?: string | null
          id?: string
          paid_bonus?: number | null
          pending_bonus?: number | null
          total_barber_referrals?: number | null
          total_bonus_earned?: number | null
          total_client_referrals?: number | null
          updated_at?: string | null
        }
        Update: {
          barber_id?: string
          created_at?: string | null
          id?: string
          paid_bonus?: number | null
          pending_bonus?: number | null
          total_barber_referrals?: number | null
          total_bonus_earned?: number | null
          total_client_referrals?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_bonuses_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "referral_bonuses_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_bonuses_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "referral_bonuses_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "referral_bonuses_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
        ]
      }
      referral_campaigns: {
        Row: {
          clicks_generated: number | null
          conversions: number | null
          created_at: string
          generated_content: Json
          id: string
          platform: string
          tone: string
          user_id: string
        }
        Insert: {
          clicks_generated?: number | null
          conversions?: number | null
          created_at?: string
          generated_content: Json
          id?: string
          platform: string
          tone: string
          user_id: string
        }
        Update: {
          clicks_generated?: number | null
          conversions?: number | null
          created_at?: string
          generated_content?: Json
          id?: string
          platform?: string
          tone?: string
          user_id?: string
        }
        Relationships: []
      }
      referral_clicks: {
        Row: {
          clicked_at: string
          conversion_value: number | null
          converted: boolean | null
          id: string
          ip_address: string | null
          ref_code: string
          user_agent: string | null
        }
        Insert: {
          clicked_at?: string
          conversion_value?: number | null
          converted?: boolean | null
          id?: string
          ip_address?: string | null
          ref_code: string
          user_agent?: string | null
        }
        Update: {
          clicked_at?: string
          conversion_value?: number | null
          converted?: boolean | null
          id?: string
          ip_address?: string | null
          ref_code?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          clicks: number | null
          code: string
          conversions: number | null
          created_at: string
          earnings: number | null
          id: string
          signups: number | null
          user_id: string | null
        }
        Insert: {
          clicks?: number | null
          code: string
          conversions?: number | null
          created_at?: string
          earnings?: number | null
          id?: string
          signups?: number | null
          user_id?: string | null
        }
        Update: {
          clicks?: number | null
          code?: string
          conversions?: number | null
          created_at?: string
          earnings?: number | null
          id?: string
          signups?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      referral_earnings: {
        Row: {
          amount: number
          attribution_id: string
          created_at: string
          earnings_type: string | null
          id: string
          payout_date: string | null
          referrer_id: string
          status: string
        }
        Insert: {
          amount?: number
          attribution_id: string
          created_at?: string
          earnings_type?: string | null
          id?: string
          payout_date?: string | null
          referrer_id: string
          status?: string
        }
        Update: {
          amount?: number
          attribution_id?: string
          created_at?: string
          earnings_type?: string | null
          id?: string
          payout_date?: string | null
          referrer_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_earnings_attribution_id_fkey"
            columns: ["attribution_id"]
            isOneToOne: false
            referencedRelation: "user_attributions"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_logs: {
        Row: {
          bonus_awarded: boolean | null
          created_at: string
          id: string
          ip_address: string | null
          is_flagged: boolean | null
          referreduseremail: string
          referreduserid: string | null
          referrerid: string
          user_agent: string | null
        }
        Insert: {
          bonus_awarded?: boolean | null
          created_at?: string
          id?: string
          ip_address?: string | null
          is_flagged?: boolean | null
          referreduseremail: string
          referreduserid?: string | null
          referrerid: string
          user_agent?: string | null
        }
        Update: {
          bonus_awarded?: boolean | null
          created_at?: string
          id?: string
          ip_address?: string | null
          is_flagged?: boolean | null
          referreduseremail?: string
          referreduserid?: string | null
          referrerid?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      referral_messages: {
        Row: {
          conversion_tracked: boolean | null
          copied_at: string | null
          created_at: string | null
          generated_message: string
          id: string
          recipient_name: string | null
          relationship_type: string
          shared_via: string | null
          tone: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          conversion_tracked?: boolean | null
          copied_at?: string | null
          created_at?: string | null
          generated_message: string
          id?: string
          recipient_name?: string | null
          relationship_type: string
          shared_via?: string | null
          tone: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          conversion_tracked?: boolean | null
          copied_at?: string | null
          created_at?: string | null
          generated_message?: string
          id?: string
          recipient_name?: string | null
          relationship_type?: string
          shared_via?: string | null
          tone?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      referral_payout_requests: {
        Row: {
          created_at: string
          id: string
          paid_at: string | null
          payout_amount_cents: number | null
          processed_at: string | null
          processed_by: string | null
          referrer_code: string
          referrer_id: string | null
          requested_at: string
          reward_type: string
          status: string
          stripe_transfer_id: string | null
          stripe_transfer_sent: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          paid_at?: string | null
          payout_amount_cents?: number | null
          processed_at?: string | null
          processed_by?: string | null
          referrer_code: string
          referrer_id?: string | null
          requested_at?: string
          reward_type: string
          status?: string
          stripe_transfer_id?: string | null
          stripe_transfer_sent?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          paid_at?: string | null
          payout_amount_cents?: number | null
          processed_at?: string | null
          processed_by?: string | null
          referrer_code?: string
          referrer_id?: string | null
          requested_at?: string
          reward_type?: string
          status?: string
          stripe_transfer_id?: string | null
          stripe_transfer_sent?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      referral_payouts: {
        Row: {
          amount: number
          barber_id: string
          created_at: string
          id: string
          processed_by: string | null
          reason: string
          transfer_id: string
          updated_at: string
        }
        Insert: {
          amount: number
          barber_id: string
          created_at?: string
          id?: string
          processed_by?: string | null
          reason?: string
          transfer_id: string
          updated_at?: string
        }
        Update: {
          amount?: number
          barber_id?: string
          created_at?: string
          id?: string
          processed_by?: string | null
          reason?: string
          transfer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_payouts_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "referral_payouts_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_payouts_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "referral_payouts_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "referral_payouts_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
        ]
      }
      referral_reminders: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          reminder_type: string
          triggered_at: string
          updated_at: string | null
          user_id: string
          viewed: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          reminder_type: string
          triggered_at?: string
          updated_at?: string | null
          user_id: string
          viewed?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          reminder_type?: string
          triggered_at?: string
          updated_at?: string | null
          user_id?: string
          viewed?: boolean | null
        }
        Relationships: []
      }
      referral_stats: {
        Row: {
          conversion_rate: number | null
          id: string
          pending_payout: number | null
          total_earned: number | null
          total_referrals: number | null
          updated_at: string | null
          user_id: string | null
          viral_score: number | null
          weekly_rank: number | null
        }
        Insert: {
          conversion_rate?: number | null
          id?: string
          pending_payout?: number | null
          total_earned?: number | null
          total_referrals?: number | null
          updated_at?: string | null
          user_id?: string | null
          viral_score?: number | null
          weekly_rank?: number | null
        }
        Update: {
          conversion_rate?: number | null
          id?: string
          pending_payout?: number | null
          total_earned?: number | null
          total_referrals?: number | null
          updated_at?: string | null
          user_id?: string | null
          viral_score?: number | null
          weekly_rank?: number | null
        }
        Relationships: []
      }
      referral_tracking: {
        Row: {
          created_at: string | null
          earnings_awarded: number | null
          id: string
          referral_code: string
          referral_type: string
          referred_id: string
          referrer_id: string
          signup_date: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          earnings_awarded?: number | null
          id?: string
          referral_code: string
          referral_type: string
          referred_id: string
          referrer_id: string
          signup_date?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          earnings_awarded?: number | null
          id?: string
          referral_code?: string
          referral_type?: string
          referred_id?: string
          referrer_id?: string
          signup_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_tracking_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "barber_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_tracking_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "client_streak_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_tracking_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_tracking_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "barber_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_tracking_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "client_streak_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_tracking_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          click_count: number | null
          created_at: string
          email: string | null
          hired_at: string | null
          id: string
          paid_at: string | null
          payout_amount: number | null
          payout_status: string | null
          referral_code: string
          referred_user_id: string | null
          referrer_id: string
          status: string
          updated_at: string
        }
        Insert: {
          click_count?: number | null
          created_at?: string
          email?: string | null
          hired_at?: string | null
          id?: string
          paid_at?: string | null
          payout_amount?: number | null
          payout_status?: string | null
          referral_code: string
          referred_user_id?: string | null
          referrer_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          click_count?: number | null
          created_at?: string
          email?: string | null
          hired_at?: string | null
          id?: string
          paid_at?: string | null
          payout_amount?: number | null
          payout_status?: string | null
          referral_code?: string
          referred_user_id?: string | null
          referrer_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      region_leaderboards: {
        Row: {
          barber_id: string
          created_at: string | null
          id: string
          mood_ring_status:
            | Database["public"]["Enums"]["mood_ring_status"]
            | null
          rank: number
          region_id: string
          score: number
          updated_at: string | null
          week_start: string
        }
        Insert: {
          barber_id: string
          created_at?: string | null
          id?: string
          mood_ring_status?:
            | Database["public"]["Enums"]["mood_ring_status"]
            | null
          rank: number
          region_id: string
          score?: number
          updated_at?: string | null
          week_start: string
        }
        Update: {
          barber_id?: string
          created_at?: string | null
          id?: string
          mood_ring_status?:
            | Database["public"]["Enums"]["mood_ring_status"]
            | null
          rank?: number
          region_id?: string
          score?: number
          updated_at?: string | null
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "region_leaderboards_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "region_leaderboards_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "region_leaderboards_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "region_leaderboards_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "region_leaderboards_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "region_leaderboards_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          created_at: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
          type: Database["public"]["Enums"]["region_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
          type: Database["public"]["Enums"]["region_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
          type?: Database["public"]["Enums"]["region_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      reminder_requests: {
        Row: {
          company_name: string
          created_at: string
          id: string
          job_id: string
          job_title: string
          reminder_time: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name: string
          created_at?: string
          id?: string
          job_id: string
          job_title: string
          reminder_time: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: string
          job_id?: string
          job_title?: string
          reminder_time?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reminders: {
        Row: {
          company_name: string | null
          created_at: string
          date_to_remind: string
          email: string
          id: string
          is_sent: boolean | null
          job_id: string
          job_title: string
          reminder_type: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          date_to_remind: string
          email: string
          id?: string
          is_sent?: boolean | null
          job_id: string
          job_title: string
          reminder_type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string
          date_to_remind?: string
          email?: string
          id?: string
          is_sent?: boolean | null
          job_id?: string
          job_title?: string
          reminder_type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      remix_rank_alerts: {
        Row: {
          alert_type: string
          created_at: string
          current_rank: number | null
          generated_copy: string | null
          id: string
          movement_direction: string
          previous_rank: number | null
          sent: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string
          current_rank?: number | null
          generated_copy?: string | null
          id?: string
          movement_direction: string
          previous_rank?: number | null
          sent?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          current_rank?: number | null
          generated_copy?: string | null
          id?: string
          movement_direction?: string
          previous_rank?: number | null
          sent?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      remix_rank_snapshots: {
        Row: {
          created_at: string
          id: string
          rank_position: number
          snapshot_date: string
          total_remixes: number | null
          total_score: number | null
          user_id: string
          week_start_date: string
        }
        Insert: {
          created_at?: string
          id?: string
          rank_position: number
          snapshot_date?: string
          total_remixes?: number | null
          total_score?: number | null
          user_id: string
          week_start_date: string
        }
        Update: {
          created_at?: string
          id?: string
          rank_position?: number
          snapshot_date?: string
          total_remixes?: number | null
          total_score?: number | null
          user_id?: string
          week_start_date?: string
        }
        Relationships: []
      }
      resume_generations: {
        Row: {
          applicant_id: string | null
          created_at: string | null
          experience_level: string | null
          generated_by_gpt: boolean | null
          id: string
          job_interest: string | null
          lead_id: string | null
          resume_content: string
          resume_url: string | null
          skills: string[] | null
        }
        Insert: {
          applicant_id?: string | null
          created_at?: string | null
          experience_level?: string | null
          generated_by_gpt?: boolean | null
          id?: string
          job_interest?: string | null
          lead_id?: string | null
          resume_content: string
          resume_url?: string | null
          skills?: string[] | null
        }
        Update: {
          applicant_id?: string | null
          created_at?: string | null
          experience_level?: string | null
          generated_by_gpt?: boolean | null
          id?: string
          job_interest?: string | null
          lead_id?: string | null
          resume_content?: string
          resume_url?: string | null
          skills?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_generations_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resume_generations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "inbound_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_requests: {
        Row: {
          applicant_name: string
          created_at: string
          current_job_title: string | null
          desired_job_title: string | null
          email: string
          experience_level: string | null
          id: string
          phone: string | null
          referral_source: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          applicant_name: string
          created_at?: string
          current_job_title?: string | null
          desired_job_title?: string | null
          email: string
          experience_level?: string | null
          id?: string
          phone?: string | null
          referral_source?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          applicant_name?: string
          created_at?: string
          current_job_title?: string | null
          desired_job_title?: string | null
          email?: string
          experience_level?: string | null
          id?: string
          phone?: string | null
          referral_source?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      resume_revisions: {
        Row: {
          created_at: string
          id: string
          improvement_percentage: number | null
          match_score_after: number | null
          match_score_before: number | null
          new_text: string
          old_text: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          improvement_percentage?: number | null
          match_score_after?: number | null
          match_score_before?: number | null
          new_text: string
          old_text: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          improvement_percentage?: number | null
          match_score_after?: number | null
          match_score_before?: number | null
          new_text?: string
          old_text?: string
          user_id?: string
        }
        Relationships: []
      }
      resume_summaries: {
        Row: {
          applicant_id: string | null
          created_at: string
          experience_highlights: string | null
          full_summary: string | null
          id: string
          job_match_suitability: string | null
          resume_url: string
          updated_at: string
          user_id: string
        }
        Insert: {
          applicant_id?: string | null
          created_at?: string
          experience_highlights?: string | null
          full_summary?: string | null
          id?: string
          job_match_suitability?: string | null
          resume_url: string
          updated_at?: string
          user_id: string
        }
        Update: {
          applicant_id?: string | null
          created_at?: string
          experience_highlights?: string | null
          full_summary?: string | null
          id?: string
          job_match_suitability?: string | null
          resume_url?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resume_summaries_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicants"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_versions: {
        Row: {
          created_at: string
          id: string
          improved_content: string
          improvement_notes: string | null
          is_active: boolean | null
          original_content: string
          suggested_headlines: string[] | null
          tone_style: string
          updated_at: string
          user_id: string
          version_number: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          improved_content: string
          improvement_notes?: string | null
          is_active?: boolean | null
          original_content: string
          suggested_headlines?: string[] | null
          tone_style?: string
          updated_at?: string
          user_id: string
          version_number?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          improved_content?: string
          improvement_notes?: string | null
          is_active?: boolean | null
          original_content?: string
          suggested_headlines?: string[] | null
          tone_style?: string
          updated_at?: string
          user_id?: string
          version_number?: number | null
        }
        Relationships: []
      }
      resumes: {
        Row: {
          content: Json
          created_at: string | null
          id: string
          is_public: boolean | null
          template: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: Json
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          template?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          template?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      resumes_gpt: {
        Row: {
          created_at: string
          enhanced_resume: string
          feedback_summary: string | null
          id: string
          original_filename: string | null
          original_resume: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          enhanced_resume: string
          feedback_summary?: string | null
          id?: string
          original_filename?: string | null
          original_resume?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          enhanced_resume?: string
          feedback_summary?: string | null
          id?: string
          original_filename?: string | null
          original_resume?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rss_logs: {
        Row: {
          category: string
          city: string
          created_at: string
          error_message: string | null
          id: string
          jobs_fetched: number
          timestamp: string
        }
        Insert: {
          category: string
          city: string
          created_at?: string
          error_message?: string | null
          id?: string
          jobs_fetched?: number
          timestamp?: string
        }
        Update: {
          category?: string
          city?: string
          created_at?: string
          error_message?: string | null
          id?: string
          jobs_fetched?: number
          timestamp?: string
        }
        Relationships: []
      }
      saved_jobs: {
        Row: {
          created_at: string
          id: string
          job_id: string
          job_source: string
          reminder_sent: boolean | null
          saved_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          job_source?: string
          reminder_sent?: boolean | null
          saved_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          job_source?: string
          reminder_sent?: boolean | null
          saved_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      saved_searches: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          reminder_time: string | null
          search_filters: Json | null
          search_query: string
          search_type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          reminder_time?: string | null
          search_filters?: Json | null
          search_query: string
          search_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          reminder_time?: string | null
          search_filters?: Json | null
          search_query?: string
          search_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      scam_checks: {
        Row: {
          ai_analysis: string | null
          created_at: string
          id: string
          job_text: string
          notify_others: boolean | null
          red_flags: string[] | null
          reported_as_scam: boolean | null
          safe_traits: string[] | null
          safety_tips: string[] | null
          trust_score: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          ai_analysis?: string | null
          created_at?: string
          id?: string
          job_text: string
          notify_others?: boolean | null
          red_flags?: string[] | null
          reported_as_scam?: boolean | null
          safe_traits?: string[] | null
          safety_tips?: string[] | null
          trust_score: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          ai_analysis?: string | null
          created_at?: string
          id?: string
          job_text?: string
          notify_others?: boolean | null
          red_flags?: string[] | null
          reported_as_scam?: boolean | null
          safe_traits?: string[] | null
          safety_tips?: string[] | null
          trust_score?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      scheduled_posts: {
        Row: {
          body: string | null
          campaign_id: string | null
          city: string
          craigslist_category: string | null
          created_at: string
          error_message: string | null
          flyer_variant_id: string | null
          id: string
          job_type: string
          language: string
          metadata: Json | null
          post_id: string
          posted_at: string | null
          prefill_url: string | null
          scan_count: number | null
          scheduled_date: string
          signup_count: number | null
          status: string
          title: string | null
          tone: string
          updated_at: string
          utm_campaign: string | null
        }
        Insert: {
          body?: string | null
          campaign_id?: string | null
          city: string
          craigslist_category?: string | null
          created_at?: string
          error_message?: string | null
          flyer_variant_id?: string | null
          id?: string
          job_type: string
          language?: string
          metadata?: Json | null
          post_id: string
          posted_at?: string | null
          prefill_url?: string | null
          scan_count?: number | null
          scheduled_date: string
          signup_count?: number | null
          status?: string
          title?: string | null
          tone: string
          updated_at?: string
          utm_campaign?: string | null
        }
        Update: {
          body?: string | null
          campaign_id?: string | null
          city?: string
          craigslist_category?: string | null
          created_at?: string
          error_message?: string | null
          flyer_variant_id?: string | null
          id?: string
          job_type?: string
          language?: string
          metadata?: Json | null
          post_id?: string
          posted_at?: string | null
          prefill_url?: string | null
          scan_count?: number | null
          scheduled_date?: string
          signup_count?: number | null
          status?: string
          title?: string | null
          tone?: string
          updated_at?: string
          utm_campaign?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_posts_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "auto_post_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      search_analytics: {
        Row: {
          clicked_barber_id: string | null
          created_at: string | null
          id: string
          query_type: string
          response_time_ms: number | null
          results_returned: number | null
          search_log_id: string | null
          session_id: string | null
          user_clicked: boolean | null
          user_id: string | null
        }
        Insert: {
          clicked_barber_id?: string | null
          created_at?: string | null
          id?: string
          query_type: string
          response_time_ms?: number | null
          results_returned?: number | null
          search_log_id?: string | null
          session_id?: string | null
          user_clicked?: boolean | null
          user_id?: string | null
        }
        Update: {
          clicked_barber_id?: string | null
          created_at?: string | null
          id?: string
          query_type?: string
          response_time_ms?: number | null
          results_returned?: number | null
          search_log_id?: string | null
          session_id?: string | null
          user_clicked?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "search_analytics_search_log_id_fkey"
            columns: ["search_log_id"]
            isOneToOne: false
            referencedRelation: "search_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      search_intelligence: {
        Row: {
          clicked_barber_ids: string[] | null
          created_at: string
          filters: Json | null
          id: string
          intent_data: Json | null
          location: string | null
          processed_query: string | null
          query: string
          results_found: number | null
          search_session_id: string | null
          search_type: string | null
          success_score: number | null
          user_agent: string | null
          user_location: unknown | null
        }
        Insert: {
          clicked_barber_ids?: string[] | null
          created_at?: string
          filters?: Json | null
          id?: string
          intent_data?: Json | null
          location?: string | null
          processed_query?: string | null
          query: string
          results_found?: number | null
          search_session_id?: string | null
          search_type?: string | null
          success_score?: number | null
          user_agent?: string | null
          user_location?: unknown | null
        }
        Update: {
          clicked_barber_ids?: string[] | null
          created_at?: string
          filters?: Json | null
          id?: string
          intent_data?: Json | null
          location?: string | null
          processed_query?: string | null
          query?: string
          results_found?: number | null
          search_session_id?: string | null
          search_type?: string | null
          success_score?: number | null
          user_agent?: string | null
          user_location?: unknown | null
        }
        Relationships: []
      }
      search_logs: {
        Row: {
          ai_confidence: number | null
          created_at: string
          id: string
          results_count: number | null
          search_metadata: Json | null
          search_query: string
          search_type: string
          user_id: string | null
        }
        Insert: {
          ai_confidence?: number | null
          created_at?: string
          id?: string
          results_count?: number | null
          search_metadata?: Json | null
          search_query: string
          search_type: string
          user_id?: string | null
        }
        Update: {
          ai_confidence?: number | null
          created_at?: string
          id?: string
          results_count?: number | null
          search_metadata?: Json | null
          search_query?: string
          search_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      search_patterns: {
        Row: {
          created_at: string | null
          filters: Json | null
          frequency: number | null
          id: string
          last_used: string | null
          query: string
          success_rate: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          filters?: Json | null
          frequency?: number | null
          id?: string
          last_used?: string | null
          query: string
          success_rate?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          filters?: Json | null
          frequency?: number | null
          id?: string
          last_used?: string | null
          query?: string
          success_rate?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      search_suggestions: {
        Row: {
          category: string | null
          created_at: string
          id: string
          is_active: boolean | null
          location: string | null
          priority: number | null
          search_count: number | null
          success_rate: number | null
          suggestion_text: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          priority?: number | null
          search_count?: number | null
          success_rate?: number | null
          suggestion_text: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          priority?: number | null
          search_count?: number | null
          success_rate?: number | null
          suggestion_text?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_job_guides: {
        Row: {
          applications_count: number | null
          city: string
          content: string | null
          created_at: string
          created_by_admin_id: string | null
          id: string
          job_type: string
          keywords: string[] | null
          meta_description: string | null
          published_at: string | null
          slug: string
          status: string | null
          title: string
          tone_type: string | null
          updated_at: string
          views_count: number | null
        }
        Insert: {
          applications_count?: number | null
          city: string
          content?: string | null
          created_at?: string
          created_by_admin_id?: string | null
          id?: string
          job_type: string
          keywords?: string[] | null
          meta_description?: string | null
          published_at?: string | null
          slug: string
          status?: string | null
          title: string
          tone_type?: string | null
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          applications_count?: number | null
          city?: string
          content?: string | null
          created_at?: string
          created_by_admin_id?: string | null
          id?: string
          job_type?: string
          keywords?: string[] | null
          meta_description?: string | null
          published_at?: string | null
          slug?: string
          status?: string | null
          title?: string
          tone_type?: string | null
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      seo_jobs: {
        Row: {
          company: string
          created_at: string
          description: string | null
          id: string
          location: string
          pay_range: string | null
          title: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          id?: string
          location: string
          pay_range?: string | null
          title: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          id?: string
          location?: string
          pay_range?: string | null
          title?: string
        }
        Relationships: []
      }
      seo_page_analytics: {
        Row: {
          city_visitor: string | null
          country: string | null
          created_at: string
          device_type: string | null
          id: string
          ip_address: string | null
          page_id: string
          referrer: string | null
          session_id: string | null
          user_agent: string | null
        }
        Insert: {
          city_visitor?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          ip_address?: string | null
          page_id: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Update: {
          city_visitor?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          ip_address?: string | null
          page_id?: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seo_page_analytics_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "seo_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_page_errors: {
        Row: {
          checked_at: string
          created_at: string
          error_message: string | null
          id: string
          slug: string
          status: number
        }
        Insert: {
          checked_at?: string
          created_at?: string
          error_message?: string | null
          id?: string
          slug: string
          status: number
        }
        Update: {
          checked_at?: string
          created_at?: string
          error_message?: string | null
          id?: string
          slug?: string
          status?: number
        }
        Relationships: []
      }
      seo_page_views: {
        Row: {
          city: string
          created_at: string
          id: string
          ip_address: string | null
          page_type: string
          referrer: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          ip_address?: string | null
          page_type?: string
          referrer?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          page_type?: string
          referrer?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      seo_pages: {
        Row: {
          applications_count: number
          body_html: string
          city: string
          city_id: string | null
          content: string | null
          created_at: string
          description: string
          freshness_score: number | null
          generated_at: string | null
          gpt_prompt_used: string | null
          id: string
          job_type: string
          job_type_id: string | null
          keywords: string[]
          language: string
          last_refreshed: string | null
          meta_description: string | null
          meta_tags: string
          meta_title: string | null
          published_at: string | null
          refresh_count: number | null
          slug: string
          status: string
          title: string
          updated_at: string
          views_count: number
        }
        Insert: {
          applications_count?: number
          body_html: string
          city: string
          city_id?: string | null
          content?: string | null
          created_at?: string
          description: string
          freshness_score?: number | null
          generated_at?: string | null
          gpt_prompt_used?: string | null
          id?: string
          job_type: string
          job_type_id?: string | null
          keywords?: string[]
          language?: string
          last_refreshed?: string | null
          meta_description?: string | null
          meta_tags: string
          meta_title?: string | null
          published_at?: string | null
          refresh_count?: number | null
          slug: string
          status?: string
          title: string
          updated_at?: string
          views_count?: number
        }
        Update: {
          applications_count?: number
          body_html?: string
          city?: string
          city_id?: string | null
          content?: string | null
          created_at?: string
          description?: string
          freshness_score?: number | null
          generated_at?: string | null
          gpt_prompt_used?: string | null
          id?: string
          job_type?: string
          job_type_id?: string | null
          keywords?: string[]
          language?: string
          last_refreshed?: string | null
          meta_description?: string | null
          meta_tags?: string
          meta_title?: string | null
          published_at?: string | null
          refresh_count?: number | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "seo_pages_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_pages_job_type_id_fkey"
            columns: ["job_type_id"]
            isOneToOne: false
            referencedRelation: "job_types"
            referencedColumns: ["id"]
          },
        ]
      }
      session_participants: {
        Row: {
          id: string
          joined_at: string
          session_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          session_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "shopping_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_products: {
        Row: {
          added_by: string
          created_at: string
          id: string
          product_data: Json
          session_id: string
        }
        Insert: {
          added_by: string
          created_at?: string
          id?: string
          product_data: Json
          session_id: string
        }
        Update: {
          added_by?: string
          created_at?: string
          id?: string
          product_data?: Json
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_products_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "shopping_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      share_clicks: {
        Row: {
          caption_text: string | null
          caption_tone: string | null
          created_at: string
          device_fingerprint: string | null
          flagged: boolean | null
          fraud_score: number | null
          id: string
          ip: string | null
          platform: string
          ref: string
          referrer_url: string | null
          session_id: string | null
          timestamp: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          caption_text?: string | null
          caption_tone?: string | null
          created_at?: string
          device_fingerprint?: string | null
          flagged?: boolean | null
          fraud_score?: number | null
          id?: string
          ip?: string | null
          platform: string
          ref: string
          referrer_url?: string | null
          session_id?: string | null
          timestamp?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          caption_text?: string | null
          caption_tone?: string | null
          created_at?: string
          device_fingerprint?: string | null
          flagged?: boolean | null
          fraud_score?: number | null
          id?: string
          ip?: string | null
          platform?: string
          ref?: string
          referrer_url?: string | null
          session_id?: string | null
          timestamp?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      shopping_sessions: {
        Row: {
          created_at: string
          creator_id: string
          description: string | null
          expires_at: string | null
          id: string
          is_active: boolean
          share_code: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          share_code: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          share_code?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      sitemap_entries: {
        Row: {
          change_frequency: string
          created_at: string
          id: string
          language: string
          last_modified: string
          priority: number
          url: string
        }
        Insert: {
          change_frequency?: string
          created_at?: string
          id?: string
          language?: string
          last_modified?: string
          priority?: number
          url: string
        }
        Update: {
          change_frequency?: string
          created_at?: string
          id?: string
          language?: string
          last_modified?: string
          priority?: number
          url?: string
        }
        Relationships: []
      }
      smart_alert_subscriptions: {
        Row: {
          created_at: string | null
          first_payment_credited: boolean | null
          id: string
          monthly_price: number | null
          status: string | null
          stripe_customer_id: string | null
          stripe_session_id: string | null
          subscription_id: string | null
          subscription_type: string | null
          updated_at: string | null
          user_email: string
          user_name: string | null
        }
        Insert: {
          created_at?: string | null
          first_payment_credited?: boolean | null
          id?: string
          monthly_price?: number | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_session_id?: string | null
          subscription_id?: string | null
          subscription_type?: string | null
          updated_at?: string | null
          user_email: string
          user_name?: string | null
        }
        Update: {
          created_at?: string | null
          first_payment_credited?: boolean | null
          id?: string
          monthly_price?: number | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_session_id?: string | null
          subscription_id?: string | null
          subscription_type?: string | null
          updated_at?: string | null
          user_email?: string
          user_name?: string | null
        }
        Relationships: []
      }
      smart_alerts_preferences: {
        Row: {
          alert_time: string | null
          alert_type: string
          city: string
          created_at: string | null
          id: string
          is_enabled: boolean | null
          preferred_tags: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          alert_time?: string | null
          alert_type: string
          city: string
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          preferred_tags?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          alert_time?: string | null
          alert_type?: string
          city?: string
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          preferred_tags?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      smart_alerts_subscribers: {
        Row: {
          created_at: string
          email: string | null
          id: string
          payment_status: string | null
          phone_number: string
          preferences: Json | null
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          payment_status?: string | null
          phone_number: string
          preferences?: Json | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          payment_status?: string | null
          phone_number?: string
          preferences?: Json | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      smart_match_results: {
        Row: {
          applied: boolean | null
          compatibility_score: number
          created_at: string
          id: string
          job_id: string
          match_factors: Json | null
          reasoning: string | null
          user_id: string
        }
        Insert: {
          applied?: boolean | null
          compatibility_score: number
          created_at?: string
          id?: string
          job_id: string
          match_factors?: Json | null
          reasoning?: string | null
          user_id: string
        }
        Update: {
          applied?: boolean | null
          compatibility_score?: number
          created_at?: string
          id?: string
          job_id?: string
          match_factors?: Json | null
          reasoning?: string | null
          user_id?: string
        }
        Relationships: []
      }
      smart_matches: {
        Row: {
          applied: boolean | null
          confidence_score: number
          created_at: string
          id: string
          job_id: string
          match_reasons: string[] | null
          match_score: number | null
          reason: string
          updated_at: string
          user_id: string
          viewed: boolean | null
        }
        Insert: {
          applied?: boolean | null
          confidence_score: number
          created_at?: string
          id?: string
          job_id: string
          match_reasons?: string[] | null
          match_score?: number | null
          reason: string
          updated_at?: string
          user_id: string
          viewed?: boolean | null
        }
        Update: {
          applied?: boolean | null
          confidence_score?: number
          created_at?: string
          id?: string
          job_id?: string
          match_reasons?: string[] | null
          match_score?: number | null
          reason?: string
          updated_at?: string
          user_id?: string
          viewed?: boolean | null
        }
        Relationships: []
      }
      smart_search_tags: {
        Row: {
          created_at: string
          emoji: string | null
          id: string
          is_popular: boolean | null
          tag_name: string
          tag_type: string
          usage_count: number | null
        }
        Insert: {
          created_at?: string
          emoji?: string | null
          id?: string
          is_popular?: boolean | null
          tag_name: string
          tag_type: string
          usage_count?: number | null
        }
        Update: {
          created_at?: string
          emoji?: string | null
          id?: string
          is_popular?: boolean | null
          tag_name?: string
          tag_type?: string
          usage_count?: number | null
        }
        Relationships: []
      }
      sms_campaign_recipients: {
        Row: {
          campaign_id: string | null
          clicked_at: string | null
          delivered_at: string | null
          id: string
          lead_id: string | null
          message_personalized: string | null
          opened_at: string | null
          phone_number: string
          recipient_name: string | null
          sent_at: string | null
          status: string | null
        }
        Insert: {
          campaign_id?: string | null
          clicked_at?: string | null
          delivered_at?: string | null
          id?: string
          lead_id?: string | null
          message_personalized?: string | null
          opened_at?: string | null
          phone_number: string
          recipient_name?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          campaign_id?: string | null
          clicked_at?: string | null
          delivered_at?: string | null
          id?: string
          lead_id?: string | null
          message_personalized?: string | null
          opened_at?: string | null
          phone_number?: string
          recipient_name?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sms_campaign_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "sms_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sms_campaign_recipients_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "inbound_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_campaigns: {
        Row: {
          campaign_name: string
          clicked_count: number | null
          created_at: string | null
          created_by: string | null
          delivered_count: number | null
          id: string
          message_content: string
          opened_count: number | null
          send_end_time: string | null
          send_start_time: string | null
          sent_count: number | null
          status: string | null
          total_recipients: number | null
        }
        Insert: {
          campaign_name: string
          clicked_count?: number | null
          created_at?: string | null
          created_by?: string | null
          delivered_count?: number | null
          id?: string
          message_content: string
          opened_count?: number | null
          send_end_time?: string | null
          send_start_time?: string | null
          sent_count?: number | null
          status?: string | null
          total_recipients?: number | null
        }
        Update: {
          campaign_name?: string
          clicked_count?: number | null
          created_at?: string | null
          created_by?: string | null
          delivered_count?: number | null
          id?: string
          message_content?: string
          opened_count?: number | null
          send_end_time?: string | null
          send_start_time?: string | null
          sent_count?: number | null
          status?: string | null
          total_recipients?: number | null
        }
        Relationships: []
      }
      sms_leads: {
        Row: {
          application_link_sent: boolean | null
          applications_count: number | null
          applied: boolean | null
          clicked_alert_link: boolean | null
          created_at: string
          first_application_at: string | null
          follow_up_sent: boolean | null
          ghosted_final: boolean | null
          ghosted_once: boolean | null
          hot_lead_notified: boolean | null
          id: string
          initial_message: string | null
          last_application_at: string | null
          lat: number | null
          lead_score: number | null
          lng: number | null
          location_preference: string | null
          phone_number: string
          preferred_language: string | null
          replied: boolean | null
          response_message: string | null
          response_sent: boolean | null
          status: string | null
          subscribed_to_alerts: boolean | null
          updated_at: string
          user_replied: boolean | null
          user_reply: string | null
        }
        Insert: {
          application_link_sent?: boolean | null
          applications_count?: number | null
          applied?: boolean | null
          clicked_alert_link?: boolean | null
          created_at?: string
          first_application_at?: string | null
          follow_up_sent?: boolean | null
          ghosted_final?: boolean | null
          ghosted_once?: boolean | null
          hot_lead_notified?: boolean | null
          id?: string
          initial_message?: string | null
          last_application_at?: string | null
          lat?: number | null
          lead_score?: number | null
          lng?: number | null
          location_preference?: string | null
          phone_number: string
          preferred_language?: string | null
          replied?: boolean | null
          response_message?: string | null
          response_sent?: boolean | null
          status?: string | null
          subscribed_to_alerts?: boolean | null
          updated_at?: string
          user_replied?: boolean | null
          user_reply?: string | null
        }
        Update: {
          application_link_sent?: boolean | null
          applications_count?: number | null
          applied?: boolean | null
          clicked_alert_link?: boolean | null
          created_at?: string
          first_application_at?: string | null
          follow_up_sent?: boolean | null
          ghosted_final?: boolean | null
          ghosted_once?: boolean | null
          hot_lead_notified?: boolean | null
          id?: string
          initial_message?: string | null
          last_application_at?: string | null
          lat?: number | null
          lead_score?: number | null
          lng?: number | null
          location_preference?: string | null
          phone_number?: string
          preferred_language?: string | null
          replied?: boolean | null
          response_message?: string | null
          response_sent?: boolean | null
          status?: string | null
          subscribed_to_alerts?: boolean | null
          updated_at?: string
          user_replied?: boolean | null
          user_reply?: string | null
        }
        Relationships: []
      }
      sms_link_events: {
        Row: {
          clicked: boolean
          created_at: string
          id: string
          link_id: string
          phone: string
          timestamp: string
        }
        Insert: {
          clicked?: boolean
          created_at?: string
          id?: string
          link_id: string
          phone: string
          timestamp?: string
        }
        Update: {
          clicked?: boolean
          created_at?: string
          id?: string
          link_id?: string
          phone?: string
          timestamp?: string
        }
        Relationships: []
      }
      sms_logs: {
        Row: {
          error_message: string | null
          external_message_id: string | null
          id: string
          message_content: string
          phone_number: string
          sent_at: string
          sms_type: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          error_message?: string | null
          external_message_id?: string | null
          id?: string
          message_content: string
          phone_number: string
          sent_at?: string
          sms_type: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          error_message?: string | null
          external_message_id?: string | null
          id?: string
          message_content?: string
          phone_number?: string
          sent_at?: string
          sms_type?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sms_messages: {
        Row: {
          created_at: string
          id: string
          is_ai_generated: boolean | null
          message: string
          phone: string
          sender: string
          timestamp: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_ai_generated?: boolean | null
          message: string
          phone: string
          sender: string
          timestamp?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_ai_generated?: boolean | null
          message?: string
          phone?: string
          sender?: string
          timestamp?: string
        }
        Relationships: []
      }
      sms_reminders: {
        Row: {
          appointment_id: string | null
          client_id: string | null
          created_at: string | null
          id: string
          message_content: string
          phone_number: string
          reminder_type: string
          scheduled_for: string
          sent_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          appointment_id?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          message_content: string
          phone_number: string
          reminder_type: string
          scheduled_for: string
          sent_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          appointment_id?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          message_content?: string
          phone_number?: string
          reminder_type?: string
          scheduled_for?: string
          sent_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sms_reminders_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sms_reminders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client_appointment_patterns"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "sms_reminders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sms_reminders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "cut_streak_leaderboard"
            referencedColumns: ["client_id"]
          },
        ]
      }
      social_shares: {
        Row: {
          clicks: number | null
          company_name: string | null
          created_at: string | null
          id: string
          job_id: string | null
          job_title: string | null
          platform: string | null
          share_url: string | null
          user_id: string | null
        }
        Insert: {
          clicks?: number | null
          company_name?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          job_title?: string | null
          platform?: string | null
          share_url?: string | null
          user_id?: string | null
        }
        Update: {
          clicks?: number | null
          company_name?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          job_title?: string | null
          platform?: string | null
          share_url?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      streak_badges: {
        Row: {
          badge_vibe: string
          barber_name: string
          bonus_type: string | null
          client_name: string
          created_at: string
          custom_quote: string | null
          id: string
          image_url: string | null
          streak_count: number
          updated_at: string
          user_id: string
        }
        Insert: {
          badge_vibe?: string
          barber_name: string
          bonus_type?: string | null
          client_name: string
          created_at?: string
          custom_quote?: string | null
          id?: string
          image_url?: string | null
          streak_count: number
          updated_at?: string
          user_id: string
        }
        Update: {
          badge_vibe?: string
          barber_name?: string
          bonus_type?: string | null
          client_name?: string
          created_at?: string
          custom_quote?: string | null
          id?: string
          image_url?: string | null
          streak_count?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      streak_events: {
        Row: {
          achieved_at: string | null
          id: string
          notification_sent: boolean | null
          reward_unlocked: string | null
          streak_count: number
          streak_type: string
          user_id: string | null
        }
        Insert: {
          achieved_at?: string | null
          id?: string
          notification_sent?: boolean | null
          reward_unlocked?: string | null
          streak_count: number
          streak_type: string
          user_id?: string | null
        }
        Update: {
          achieved_at?: string | null
          id?: string
          notification_sent?: boolean | null
          reward_unlocked?: string | null
          streak_count?: number
          streak_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      stripe_connect_sessions: {
        Row: {
          account_link_url: string
          barber_id: string
          completed: boolean | null
          created_at: string | null
          expires_at: string
          id: string
          refresh_url: string
          return_url: string
          updated_at: string | null
        }
        Insert: {
          account_link_url: string
          barber_id: string
          completed?: boolean | null
          created_at?: string | null
          expires_at: string
          id?: string
          refresh_url: string
          return_url: string
          updated_at?: string | null
        }
        Update: {
          account_link_url?: string
          barber_id?: string
          completed?: boolean | null
          created_at?: string | null
          expires_at?: string
          id?: string
          refresh_url?: string
          return_url?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stripe_connect_sessions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "stripe_connect_sessions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stripe_connect_sessions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "stripe_connect_sessions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "stripe_connect_sessions_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
        ]
      }
      stripe_subscriptions: {
        Row: {
          amount_cents: number | null
          created_at: string
          email: string | null
          id: string
          phone_number: string | null
          status: string | null
          subscription_id: string | null
          updated_at: string
        }
        Insert: {
          amount_cents?: number | null
          created_at?: string
          email?: string | null
          id?: string
          phone_number?: string | null
          status?: string | null
          subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          amount_cents?: number | null
          created_at?: string
          email?: string | null
          id?: string
          phone_number?: string | null
          status?: string | null
          subscription_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          barber_id: string
          bonus_active: boolean | null
          created_at: string
          cuts_per_month: number
          description: string | null
          id: string
          includes_beard_trim: boolean | null
          includes_styling: boolean | null
          includes_wash: boolean | null
          is_active: boolean | null
          last_chance_bonus: string | null
          name: string
          price_monthly: number
          updated_at: string
        }
        Insert: {
          barber_id: string
          bonus_active?: boolean | null
          created_at?: string
          cuts_per_month?: number
          description?: string | null
          id?: string
          includes_beard_trim?: boolean | null
          includes_styling?: boolean | null
          includes_wash?: boolean | null
          is_active?: boolean | null
          last_chance_bonus?: string | null
          name: string
          price_monthly: number
          updated_at?: string
        }
        Update: {
          barber_id?: string
          bonus_active?: boolean | null
          created_at?: string
          cuts_per_month?: number
          description?: string | null
          id?: string
          includes_beard_trim?: boolean | null
          includes_styling?: boolean | null
          includes_wash?: boolean | null
          is_active?: boolean | null
          last_chance_bonus?: string | null
          name?: string
          price_monthly?: number
          updated_at?: string
        }
        Relationships: []
      }
      success_page_visits: {
        Row: {
          created_at: string | null
          id: string
          page_type: string
          referrer: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          page_type: string
          referrer?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          page_type?: string
          referrer?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      tool_insights: {
        Row: {
          expires_at: string | null
          generated_at: string
          id: string
          insight_text: string
          insight_type: string
          metrics: Json | null
          user_id: string
        }
        Insert: {
          expires_at?: string | null
          generated_at?: string
          id?: string
          insight_text: string
          insight_type?: string
          metrics?: Json | null
          user_id: string
        }
        Update: {
          expires_at?: string | null
          generated_at?: string
          id?: string
          insight_text?: string
          insight_type?: string
          metrics?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      tool_usage: {
        Row: {
          created_at: string
          id: string
          session_data: Json | null
          tool_name: string
          used_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          session_data?: Json | null
          tool_name: string
          used_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          session_data?: Json | null
          tool_name?: string
          used_at?: string
          user_id?: string
        }
        Relationships: []
      }
      top_flyer_captions: {
        Row: {
          avg_ctr: number
          badges: Json | null
          caption_text: string
          city: string | null
          country: string | null
          created_at: string
          creator_id: string | null
          hall_of_fame_entry_date: string | null
          id: string
          language: string
          performance_rank: number | null
          state: string | null
          total_clicks: number
          total_signups: number
          updated_at: string
          used_in_flyer_id: string | null
          weekly_rank: number | null
        }
        Insert: {
          avg_ctr?: number
          badges?: Json | null
          caption_text: string
          city?: string | null
          country?: string | null
          created_at?: string
          creator_id?: string | null
          hall_of_fame_entry_date?: string | null
          id?: string
          language?: string
          performance_rank?: number | null
          state?: string | null
          total_clicks?: number
          total_signups?: number
          updated_at?: string
          used_in_flyer_id?: string | null
          weekly_rank?: number | null
        }
        Update: {
          avg_ctr?: number
          badges?: Json | null
          caption_text?: string
          city?: string | null
          country?: string | null
          created_at?: string
          creator_id?: string | null
          hall_of_fame_entry_date?: string | null
          id?: string
          language?: string
          performance_rank?: number | null
          state?: string | null
          total_clicks?: number
          total_signups?: number
          updated_at?: string
          used_in_flyer_id?: string | null
          weekly_rank?: number | null
        }
        Relationships: []
      }
      translations: {
        Row: {
          created_at: string
          de: string | null
          en: string
          es: string | null
          fr: string | null
          id: string
          it: string | null
          key: string
          pt: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          de?: string | null
          en: string
          es?: string | null
          fr?: string | null
          id?: string
          it?: string | null
          key: string
          pt?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          de?: string | null
          en?: string
          es?: string | null
          fr?: string | null
          id?: string
          it?: string | null
          key?: string
          pt?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      trending_topics: {
        Row: {
          created_at: string | null
          id: string
          search_count: number | null
          topic_type: string
          topic_value: string
          trend_score: number | null
          updated_at: string | null
          week_start: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          search_count?: number | null
          topic_type: string
          topic_value: string
          trend_score?: number | null
          updated_at?: string | null
          week_start?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          search_count?: number | null
          topic_type?: string
          topic_value?: string
          trend_score?: number | null
          updated_at?: string | null
          week_start?: string | null
        }
        Relationships: []
      }
      upgrade_popup_tracking: {
        Row: {
          created_at: string
          dismissed_at: string | null
          id: string
          last_shown_at: string
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          dismissed_at?: string | null
          id?: string
          last_shown_at?: string
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          dismissed_at?: string | null
          id?: string
          last_shown_at?: string
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          activity_type: string
          created_at: string
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_addresses: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          id: string
          is_default: boolean | null
          name: string | null
          state: string | null
          updated_at: string
          user_id: string
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: string
          is_default?: boolean | null
          name?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: string
          is_default?: boolean | null
          name?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
          zip?: string | null
        }
        Relationships: []
      }
      user_analytics: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          ip_address: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_attributions: {
        Row: {
          attribution_type: string | null
          click_id: string | null
          created_at: string
          id: string
          new_user_id: string
          platform: string
          referrer_id: string
          source_timestamp: string | null
        }
        Insert: {
          attribution_type?: string | null
          click_id?: string | null
          created_at?: string
          id?: string
          new_user_id: string
          platform: string
          referrer_id: string
          source_timestamp?: string | null
        }
        Update: {
          attribution_type?: string | null
          click_id?: string | null
          created_at?: string
          id?: string
          new_user_id?: string
          platform?: string
          referrer_id?: string
          source_timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_attributions_click_id_fkey"
            columns: ["click_id"]
            isOneToOne: false
            referencedRelation: "share_clicks"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          conversion_popup_dismissed: boolean | null
          created_at: string
          id: string
          pro_seeker_earned_at: string | null
          tools_used: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          conversion_popup_dismissed?: boolean | null
          created_at?: string
          id?: string
          pro_seeker_earned_at?: string | null
          tools_used?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          conversion_popup_dismissed?: boolean | null
          created_at?: string
          id?: string
          pro_seeker_earned_at?: string | null
          tools_used?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_celebration_preferences: {
        Row: {
          auto_share_enabled: boolean | null
          confetti_enabled: boolean | null
          created_at: string | null
          id: string
          last_mood_celebration_seen: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_share_enabled?: boolean | null
          confetti_enabled?: boolean | null
          created_at?: string | null
          id?: string
          last_mood_celebration_seen?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_share_enabled?: boolean | null
          confetti_enabled?: boolean | null
          created_at?: string | null
          id?: string
          last_mood_celebration_seen?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          balance: number
          created_at: string
          id: string
          total_earned: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          total_earned?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          total_earned?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_digests: {
        Row: {
          created_at: string
          digest_content: string | null
          frequency: string
          id: string
          is_enabled: boolean | null
          sent_at: string
          top_products: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          digest_content?: string | null
          frequency?: string
          id?: string
          is_enabled?: boolean | null
          sent_at?: string
          top_products?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          digest_content?: string | null
          frequency?: string
          id?: string
          is_enabled?: boolean | null
          sent_at?: string
          top_products?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_embeddings: {
        Row: {
          created_at: string
          embedding: Json
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          embedding: Json
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          embedding?: Json
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_job_actions: {
        Row: {
          applied: boolean | null
          created_at: string
          id: string
          job_id: string
          remind_at: string | null
          saved: boolean | null
          streak_count: number | null
          swipe_action: string | null
          unlocked_via: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          applied?: boolean | null
          created_at?: string
          id?: string
          job_id: string
          remind_at?: string | null
          saved?: boolean | null
          streak_count?: number | null
          swipe_action?: string | null
          unlocked_via?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          applied?: boolean | null
          created_at?: string
          id?: string
          job_id?: string
          remind_at?: string | null
          saved?: boolean | null
          streak_count?: number | null
          swipe_action?: string | null
          unlocked_via?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_job_preferences: {
        Row: {
          city_preference: string | null
          created_at: string
          id: string
          last_viewed_jobs: string[] | null
          premium_until: string | null
          subscribed_to_alerts: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          city_preference?: string | null
          created_at?: string
          id?: string
          last_viewed_jobs?: string[] | null
          premium_until?: string | null
          subscribed_to_alerts?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          city_preference?: string | null
          created_at?: string
          id?: string
          last_viewed_jobs?: string[] | null
          premium_until?: string | null
          subscribed_to_alerts?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_notification_preferences: {
        Row: {
          created_at: string
          digest_enabled: boolean | null
          digest_frequency: string | null
          email_notifications: boolean | null
          id: string
          phone_number: string | null
          price_alerts_enabled: boolean | null
          reminders_enabled: boolean | null
          sms_notifications: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          digest_enabled?: boolean | null
          digest_frequency?: string | null
          email_notifications?: boolean | null
          id?: string
          phone_number?: string | null
          price_alerts_enabled?: boolean | null
          reminders_enabled?: boolean | null
          sms_notifications?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          digest_enabled?: boolean | null
          digest_frequency?: string | null
          email_notifications?: boolean | null
          id?: string
          phone_number?: string | null
          price_alerts_enabled?: boolean | null
          reminders_enabled?: boolean | null
          sms_notifications?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_posted_jobs: {
        Row: {
          average_rating: number | null
          company: string | null
          contact_email: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_flagged: boolean | null
          job_title: string
          location: string
          promoted_job_id: string | null
          safe_score: number | null
          salary_max: number | null
          salary_min: number | null
          status: string | null
          tags: string[] | null
          total_reviews: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          average_rating?: number | null
          company?: string | null
          contact_email: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_flagged?: boolean | null
          job_title: string
          location: string
          promoted_job_id?: string | null
          safe_score?: number | null
          salary_max?: number | null
          salary_min?: number | null
          status?: string | null
          tags?: string[] | null
          total_reviews?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          average_rating?: number | null
          company?: string | null
          contact_email?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_flagged?: boolean | null
          job_title?: string
          location?: string
          promoted_job_id?: string | null
          safe_score?: number | null
          salary_max?: number | null
          salary_min?: number | null
          status?: string | null
          tags?: string[] | null
          total_reviews?: number | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_posted_jobs_promoted_job_id_fkey"
            columns: ["promoted_job_id"]
            isOneToOne: false
            referencedRelation: "real_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          adaptive_memory_enabled: boolean | null
          api_key: string | null
          created_at: string
          id: string
          memory_context_limit: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          adaptive_memory_enabled?: boolean | null
          api_key?: string | null
          created_at?: string
          id?: string
          memory_context_limit?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          adaptive_memory_enabled?: boolean | null
          api_key?: string | null
          created_at?: string
          id?: string
          memory_context_limit?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          follower_count: number | null
          handle: string | null
          id: string
          onboarding_completed: boolean | null
          onboarding_step: number | null
          referral_code: string | null
          stripe_account_id: string | null
          tiktok_handle: string | null
          twitter_handle: string | null
          updated_at: string
          user_id: string
          username: string | null
          youtube_handle: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          follower_count?: number | null
          handle?: string | null
          id?: string
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          referral_code?: string | null
          stripe_account_id?: string | null
          tiktok_handle?: string | null
          twitter_handle?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
          youtube_handle?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          follower_count?: number | null
          handle?: string | null
          id?: string
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          referral_code?: string | null
          stripe_account_id?: string | null
          tiktok_handle?: string | null
          twitter_handle?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
          youtube_handle?: string | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          badges_earned: string[] | null
          created_at: string
          id: string
          jobs_applied_count: number | null
          last_activity_at: string | null
          resume_score: number | null
          tools_used: string[] | null
          updated_at: string
          user_id: string
          weekly_activity: Json | null
        }
        Insert: {
          badges_earned?: string[] | null
          created_at?: string
          id?: string
          jobs_applied_count?: number | null
          last_activity_at?: string | null
          resume_score?: number | null
          tools_used?: string[] | null
          updated_at?: string
          user_id: string
          weekly_activity?: Json | null
        }
        Update: {
          badges_earned?: string[] | null
          created_at?: string
          id?: string
          jobs_applied_count?: number | null
          last_activity_at?: string | null
          resume_score?: number | null
          tools_used?: string[] | null
          updated_at?: string
          user_id?: string
          weekly_activity?: Json | null
        }
        Relationships: []
      }
      user_prompt_history: {
        Row: {
          created_at: string
          emotion: string | null
          gpt_response: string | null
          id: string
          location: string | null
          platform: string | null
          prompt_content: string
          prompt_id: string | null
          tags: string[] | null
          tone: string | null
          tool_metadata: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          emotion?: string | null
          gpt_response?: string | null
          id?: string
          location?: string | null
          platform?: string | null
          prompt_content: string
          prompt_id?: string | null
          tags?: string[] | null
          tone?: string | null
          tool_metadata?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          emotion?: string | null
          gpt_response?: string | null
          id?: string
          location?: string | null
          platform?: string | null
          prompt_content?: string
          prompt_id?: string | null
          tags?: string[] | null
          tone?: string | null
          tool_metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_prompt_history_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_referrals: {
        Row: {
          created_at: string
          id: string
          premium_unlocked_until: string | null
          referral_code: string | null
          referred_email: string
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          premium_unlocked_until?: string | null
          referral_code?: string | null
          referred_email: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          premium_unlocked_until?: string | null
          referral_code?: string | null
          referred_email?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_reminders: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          product_id: string
          product_title: string | null
          reminder_type: string
          scheduled_at: string
          sent_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          product_id: string
          product_title?: string | null
          reminder_type: string
          scheduled_at: string
          sent_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          product_id?: string
          product_title?: string | null
          reminder_type?: string
          scheduled_at?: string
          sent_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_search_preferences: {
        Row: {
          auto_location: boolean | null
          created_at: string | null
          id: string
          location_city: string | null
          location_lat: number | null
          location_lng: number | null
          location_region: string | null
          preferred_language: string | null
          preferred_moods: Json | null
          updated_at: string | null
          user_id: string | null
          vibe_profile: Json | null
        }
        Insert: {
          auto_location?: boolean | null
          created_at?: string | null
          id?: string
          location_city?: string | null
          location_lat?: number | null
          location_lng?: number | null
          location_region?: string | null
          preferred_language?: string | null
          preferred_moods?: Json | null
          updated_at?: string | null
          user_id?: string | null
          vibe_profile?: Json | null
        }
        Update: {
          auto_location?: boolean | null
          created_at?: string | null
          id?: string
          location_city?: string | null
          location_lat?: number | null
          location_lng?: number | null
          location_region?: string | null
          preferred_language?: string | null
          preferred_moods?: Json | null
          updated_at?: string | null
          user_id?: string | null
          vibe_profile?: Json | null
        }
        Relationships: []
      }
      users: {
        Row: {
          balance: number | null
          created_at: string
          email: string
          flagged: boolean | null
          full_name: string | null
          id: string
          onboarding_completed: boolean
          referral_code: string | null
          referralid: string
          referredby: string | null
          updated_at: string | null
          user_type: string
        }
        Insert: {
          balance?: number | null
          created_at?: string
          email: string
          flagged?: boolean | null
          full_name?: string | null
          id?: string
          onboarding_completed?: boolean
          referral_code?: string | null
          referralid: string
          referredby?: string | null
          updated_at?: string | null
          user_type: string
        }
        Update: {
          balance?: number | null
          created_at?: string
          email?: string
          flagged?: boolean | null
          full_name?: string | null
          id?: string
          onboarding_completed?: boolean
          referral_code?: string | null
          referralid?: string
          referredby?: string | null
          updated_at?: string | null
          user_type?: string
        }
        Relationships: []
      }
      va_assignments: {
        Row: {
          assigned_date: string
          bonus_amount: number | null
          created_at: string
          due_date: string
          id: string
          instructions: string | null
          priority: number | null
          scheduled_post_id: string | null
          status: string
          updated_at: string
          va_id: string | null
        }
        Insert: {
          assigned_date?: string
          bonus_amount?: number | null
          created_at?: string
          due_date: string
          id?: string
          instructions?: string | null
          priority?: number | null
          scheduled_post_id?: string | null
          status?: string
          updated_at?: string
          va_id?: string | null
        }
        Update: {
          assigned_date?: string
          bonus_amount?: number | null
          created_at?: string
          due_date?: string
          id?: string
          instructions?: string | null
          priority?: number | null
          scheduled_post_id?: string | null
          status?: string
          updated_at?: string
          va_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "va_assignments_scheduled_post_id_fkey"
            columns: ["scheduled_post_id"]
            isOneToOne: false
            referencedRelation: "scheduled_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "va_assignments_va_id_fkey"
            columns: ["va_id"]
            isOneToOne: false
            referencedRelation: "virtual_assistants"
            referencedColumns: ["id"]
          },
        ]
      }
      va_badges: {
        Row: {
          badge_description: string | null
          badge_emoji: string | null
          badge_name: string
          badge_type: string
          created_at: string
          earned_date: string
          id: string
          is_featured: boolean | null
          points_value: number | null
          va_id: string | null
        }
        Insert: {
          badge_description?: string | null
          badge_emoji?: string | null
          badge_name: string
          badge_type: string
          created_at?: string
          earned_date?: string
          id?: string
          is_featured?: boolean | null
          points_value?: number | null
          va_id?: string | null
        }
        Update: {
          badge_description?: string | null
          badge_emoji?: string | null
          badge_name?: string
          badge_type?: string
          created_at?: string
          earned_date?: string
          id?: string
          is_featured?: boolean | null
          points_value?: number | null
          va_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "va_badges_va_id_fkey"
            columns: ["va_id"]
            isOneToOne: false
            referencedRelation: "virtual_assistants"
            referencedColumns: ["id"]
          },
        ]
      }
      va_performance: {
        Row: {
          avg_submission_time_hours: number | null
          bonus_earned: number | null
          cities_posted: string[] | null
          created_at: string
          date: string
          earnings_earned: number | null
          id: string
          period_type: string
          posts_approved: number | null
          posts_assigned: number | null
          posts_rejected: number | null
          posts_submitted: number | null
          streak_days: number | null
          va_id: string | null
        }
        Insert: {
          avg_submission_time_hours?: number | null
          bonus_earned?: number | null
          cities_posted?: string[] | null
          created_at?: string
          date: string
          earnings_earned?: number | null
          id?: string
          period_type?: string
          posts_approved?: number | null
          posts_assigned?: number | null
          posts_rejected?: number | null
          posts_submitted?: number | null
          streak_days?: number | null
          va_id?: string | null
        }
        Update: {
          avg_submission_time_hours?: number | null
          bonus_earned?: number | null
          cities_posted?: string[] | null
          created_at?: string
          date?: string
          earnings_earned?: number | null
          id?: string
          period_type?: string
          posts_approved?: number | null
          posts_assigned?: number | null
          posts_rejected?: number | null
          posts_submitted?: number | null
          streak_days?: number | null
          va_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "va_performance_va_id_fkey"
            columns: ["va_id"]
            isOneToOne: false
            referencedRelation: "virtual_assistants"
            referencedColumns: ["id"]
          },
        ]
      }
      va_referrals: {
        Row: {
          bonus_amount: number | null
          bonus_paid_date: string | null
          created_at: string
          id: string
          qualification_date: string | null
          referral_code: string
          referred_va_id: string | null
          referrer_va_id: string | null
          status: string
        }
        Insert: {
          bonus_amount?: number | null
          bonus_paid_date?: string | null
          created_at?: string
          id?: string
          qualification_date?: string | null
          referral_code: string
          referred_va_id?: string | null
          referrer_va_id?: string | null
          status?: string
        }
        Update: {
          bonus_amount?: number | null
          bonus_paid_date?: string | null
          created_at?: string
          id?: string
          qualification_date?: string | null
          referral_code?: string
          referred_va_id?: string | null
          referrer_va_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "va_referrals_referred_va_id_fkey"
            columns: ["referred_va_id"]
            isOneToOne: false
            referencedRelation: "virtual_assistants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "va_referrals_referrer_va_id_fkey"
            columns: ["referrer_va_id"]
            isOneToOne: false
            referencedRelation: "virtual_assistants"
            referencedColumns: ["id"]
          },
        ]
      }
      va_submissions: {
        Row: {
          assignment_id: string | null
          craigslist_url: string | null
          created_at: string
          fraud_flags: string[] | null
          fraud_score: number | null
          geo_location: Json | null
          id: string
          ip_address: string | null
          payment_amount: number | null
          payment_status: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          reviewer_notes: string | null
          screenshot_url: string | null
          status: string
          submission_notes: string | null
          submitted_at: string
          updated_at: string
          user_agent: string | null
          va_id: string | null
        }
        Insert: {
          assignment_id?: string | null
          craigslist_url?: string | null
          created_at?: string
          fraud_flags?: string[] | null
          fraud_score?: number | null
          geo_location?: Json | null
          id?: string
          ip_address?: string | null
          payment_amount?: number | null
          payment_status?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          screenshot_url?: string | null
          status?: string
          submission_notes?: string | null
          submitted_at?: string
          updated_at?: string
          user_agent?: string | null
          va_id?: string | null
        }
        Update: {
          assignment_id?: string | null
          craigslist_url?: string | null
          created_at?: string
          fraud_flags?: string[] | null
          fraud_score?: number | null
          geo_location?: Json | null
          id?: string
          ip_address?: string | null
          payment_amount?: number | null
          payment_status?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          screenshot_url?: string | null
          status?: string
          submission_notes?: string | null
          submitted_at?: string
          updated_at?: string
          user_agent?: string | null
          va_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "va_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "va_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "va_submissions_va_id_fkey"
            columns: ["va_id"]
            isOneToOne: false
            referencedRelation: "virtual_assistants"
            referencedColumns: ["id"]
          },
        ]
      }
      video_resumes: {
        Row: {
          approved: boolean | null
          clarity_score: number | null
          confidence_score: number | null
          created_at: string
          enthusiasm_score: number | null
          id: string
          transcript: string | null
          updated_at: string
          user_id: string
          video_url: string
        }
        Insert: {
          approved?: boolean | null
          clarity_score?: number | null
          confidence_score?: number | null
          created_at?: string
          enthusiasm_score?: number | null
          id?: string
          transcript?: string | null
          updated_at?: string
          user_id: string
          video_url: string
        }
        Update: {
          approved?: boolean | null
          clarity_score?: number | null
          confidence_score?: number | null
          created_at?: string
          enthusiasm_score?: number | null
          id?: string
          transcript?: string | null
          updated_at?: string
          user_id?: string
          video_url?: string
        }
        Relationships: []
      }
      viral_badges: {
        Row: {
          badge_emoji: string
          badge_name: string
          badge_type: string
          created_at: string | null
          id: string
          is_shared: boolean | null
          milestone_value: number
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          badge_emoji: string
          badge_name: string
          badge_type: string
          created_at?: string | null
          id?: string
          is_shared?: boolean | null
          milestone_value: number
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          badge_emoji?: string
          badge_name?: string
          badge_type?: string
          created_at?: string | null
          id?: string
          is_shared?: boolean | null
          milestone_value?: number
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      viral_campaigns: {
        Row: {
          click_count: number | null
          content_type: string
          conversion_count: number | null
          created_at: string | null
          creator_id: string | null
          earnings_generated: number | null
          generated_content: string | null
          id: string
          platform: string
          share_count: number | null
        }
        Insert: {
          click_count?: number | null
          content_type: string
          conversion_count?: number | null
          created_at?: string | null
          creator_id?: string | null
          earnings_generated?: number | null
          generated_content?: string | null
          id?: string
          platform: string
          share_count?: number | null
        }
        Update: {
          click_count?: number | null
          content_type?: string
          conversion_count?: number | null
          created_at?: string | null
          creator_id?: string | null
          earnings_generated?: number | null
          generated_content?: string | null
          id?: string
          platform?: string
          share_count?: number | null
        }
        Relationships: []
      }
      viral_shares: {
        Row: {
          clicks_generated: number | null
          content: string | null
          conversions_generated: number | null
          created_at: string | null
          id: string
          platform: string
          referral_code: string | null
          share_type: string
          user_id: string
        }
        Insert: {
          clicks_generated?: number | null
          content?: string | null
          conversions_generated?: number | null
          created_at?: string | null
          id?: string
          platform: string
          referral_code?: string | null
          share_type: string
          user_id: string
        }
        Update: {
          clicks_generated?: number | null
          content?: string | null
          conversions_generated?: number | null
          created_at?: string | null
          id?: string
          platform?: string
          referral_code?: string | null
          share_type?: string
          user_id?: string
        }
        Relationships: []
      }
      virtual_assistants: {
        Row: {
          created_at: string
          current_streak_days: number | null
          email: string
          full_name: string
          id: string
          last_active_date: string | null
          location_city: string | null
          location_country: string | null
          longest_streak_days: number | null
          metadata: Json | null
          notes: string | null
          payment_rate: number | null
          phone: string | null
          referral_code: string | null
          referral_earnings: number | null
          referred_by: string | null
          status: string
          timezone: string | null
          total_earnings: number | null
          total_posts_completed: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          current_streak_days?: number | null
          email: string
          full_name: string
          id?: string
          last_active_date?: string | null
          location_city?: string | null
          location_country?: string | null
          longest_streak_days?: number | null
          metadata?: Json | null
          notes?: string | null
          payment_rate?: number | null
          phone?: string | null
          referral_code?: string | null
          referral_earnings?: number | null
          referred_by?: string | null
          status?: string
          timezone?: string | null
          total_earnings?: number | null
          total_posts_completed?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          current_streak_days?: number | null
          email?: string
          full_name?: string
          id?: string
          last_active_date?: string | null
          location_city?: string | null
          location_country?: string | null
          longest_streak_days?: number | null
          metadata?: Json | null
          notes?: string | null
          payment_rate?: number | null
          phone?: string | null
          referral_code?: string | null
          referral_earnings?: number | null
          referred_by?: string | null
          status?: string
          timezone?: string | null
          total_earnings?: number | null
          total_posts_completed?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "virtual_assistants_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "virtual_assistants"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist_requests: {
        Row: {
          barber_id: string
          client_id: string
          created_at: string | null
          fulfilled_at: string | null
          id: string
          notes: string | null
          preferred_date: string | null
          preferred_time: string | null
          status: string | null
        }
        Insert: {
          barber_id: string
          client_id: string
          created_at?: string | null
          fulfilled_at?: string | null
          id?: string
          notes?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          status?: string | null
        }
        Update: {
          barber_id?: string
          client_id?: string
          created_at?: string | null
          fulfilled_at?: string | null
          id?: string
          notes?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "waitlist_requests_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client_appointment_patterns"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "waitlist_requests_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waitlist_requests_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "cut_streak_leaderboard"
            referencedColumns: ["client_id"]
          },
        ]
      }
      weekly_gpt_flyer_copy: {
        Row: {
          city: string
          craigslist_text: string
          created_at: string
          flyer_text: string
          generated_at: string
          id: string
          job_type: string
          original_body: string | null
          original_headline: string | null
          performance_score: number | null
          updated_at: string
        }
        Insert: {
          city: string
          craigslist_text: string
          created_at?: string
          flyer_text: string
          generated_at?: string
          id?: string
          job_type: string
          original_body?: string | null
          original_headline?: string | null
          performance_score?: number | null
          updated_at?: string
        }
        Update: {
          city?: string
          craigslist_text?: string
          created_at?: string
          flyer_text?: string
          generated_at?: string
          id?: string
          job_type?: string
          original_body?: string | null
          original_headline?: string | null
          performance_score?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      weekly_hof_winners: {
        Row: {
          barber_id: string | null
          barber_location: string | null
          barber_name: string | null
          bookings_generated: number
          caption_performance_id: string | null
          caption_text: string
          clicks: number
          created_at: string
          id: string
          rank: number
          shares: number
          viral_score: number
          week_start_date: string
        }
        Insert: {
          barber_id?: string | null
          barber_location?: string | null
          barber_name?: string | null
          bookings_generated: number
          caption_performance_id?: string | null
          caption_text: string
          clicks: number
          created_at?: string
          id?: string
          rank: number
          shares: number
          viral_score: number
          week_start_date: string
        }
        Update: {
          barber_id?: string | null
          barber_location?: string | null
          barber_name?: string | null
          bookings_generated?: number
          caption_performance_id?: string | null
          caption_text?: string
          clicks?: number
          created_at?: string
          id?: string
          rank?: number
          shares?: number
          viral_score?: number
          week_start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_hof_winners_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "weekly_hof_winners_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weekly_hof_winners_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "weekly_hof_winners_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "weekly_hof_winners_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "weekly_hof_winners_caption_performance_id_fkey"
            columns: ["caption_performance_id"]
            isOneToOne: false
            referencedRelation: "caption_hall_of_fame_performance"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_insights: {
        Row: {
          city: string | null
          confidence_score: number | null
          generated_at: string
          id: string
          insight_text: string
          insight_type: string
          is_active: boolean | null
          job_type: string | null
          promoter_id: string | null
          supporting_data: Json | null
          week_start_date: string
        }
        Insert: {
          city?: string | null
          confidence_score?: number | null
          generated_at?: string
          id?: string
          insight_text: string
          insight_type: string
          is_active?: boolean | null
          job_type?: string | null
          promoter_id?: string | null
          supporting_data?: Json | null
          week_start_date: string
        }
        Update: {
          city?: string | null
          confidence_score?: number | null
          generated_at?: string
          id?: string
          insight_text?: string
          insight_type?: string
          is_active?: boolean | null
          job_type?: string | null
          promoter_id?: string | null
          supporting_data?: Json | null
          week_start_date?: string
        }
        Relationships: []
      }
      weekly_leaderboard_snapshots: {
        Row: {
          barber_id: string
          city_rank: number | null
          created_at: string | null
          global_rank: number | null
          id: string
          snapshot_week: string
          state_rank: number | null
          tier: string | null
          total_referrals: number | null
        }
        Insert: {
          barber_id: string
          city_rank?: number | null
          created_at?: string | null
          global_rank?: number | null
          id?: string
          snapshot_week: string
          state_rank?: number | null
          tier?: string | null
          total_referrals?: number | null
        }
        Update: {
          barber_id?: string
          city_rank?: number | null
          created_at?: string | null
          global_rank?: number | null
          id?: string
          snapshot_week?: string
          state_rank?: number | null
          tier?: string | null
          total_referrals?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "weekly_leaderboard_snapshots_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barber_share_analytics"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "weekly_leaderboard_snapshots_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weekly_leaderboard_snapshots_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "evolution_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "weekly_leaderboard_snapshots_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard"
            referencedColumns: ["barber_id"]
          },
          {
            foreignKeyName: "weekly_leaderboard_snapshots_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "regional_viral_leaderboard_enhanced"
            referencedColumns: ["barber_id"]
          },
        ]
      }
      weekly_mood_snapshots: {
        Row: {
          barber_count: number
          borough: string
          created_at: string
          id: string
          mood: string
          updated_at: string
          week_start_date: string
        }
        Insert: {
          barber_count?: number
          borough: string
          created_at?: string
          id?: string
          mood: string
          updated_at?: string
          week_start_date: string
        }
        Update: {
          barber_count?: number
          borough?: string
          created_at?: string
          id?: string
          mood?: string
          updated_at?: string
          week_start_date?: string
        }
        Relationships: []
      }
      weekly_remix_badges: {
        Row: {
          achievement_value: number
          badge_description: string
          badge_emoji: string
          badge_name: string
          badge_type: string
          barber_id: string
          created_at: string
          id: string
          week_end_date: string
          week_start_date: string
        }
        Insert: {
          achievement_value: number
          badge_description: string
          badge_emoji: string
          badge_name: string
          badge_type: string
          barber_id: string
          created_at?: string
          id?: string
          week_end_date: string
          week_start_date: string
        }
        Update: {
          achievement_value?: number
          badge_description?: string
          badge_emoji?: string
          badge_name?: string
          badge_type?: string
          barber_id?: string
          created_at?: string
          id?: string
          week_end_date?: string
          week_start_date?: string
        }
        Relationships: []
      }
      weekly_remix_stats: {
        Row: {
          barber_id: string
          created_at: string
          growth_rate: number
          id: string
          total_captions_created: number
          total_remix_score: number
          total_remixes_received: number
          trending_captions_count: number
          updated_at: string
          week_start_date: string
        }
        Insert: {
          barber_id: string
          created_at?: string
          growth_rate?: number
          id?: string
          total_captions_created?: number
          total_remix_score?: number
          total_remixes_received?: number
          trending_captions_count?: number
          updated_at?: string
          week_start_date: string
        }
        Update: {
          barber_id?: string
          created_at?: string
          growth_rate?: number
          id?: string
          total_captions_created?: number
          total_remix_score?: number
          total_remixes_received?: number
          trending_captions_count?: number
          updated_at?: string
          week_start_date?: string
        }
        Relationships: []
      }
      winning_edits: {
        Row: {
          boost_percent: number
          created_at: string
          edit_snippet: string
          id: string
          job_type: string
          success_rate: number | null
          updated_at: string
          usage_count: number | null
        }
        Insert: {
          boost_percent?: number
          created_at?: string
          edit_snippet: string
          id?: string
          job_type: string
          success_rate?: number | null
          updated_at?: string
          usage_count?: number | null
        }
        Update: {
          boost_percent?: number
          created_at?: string
          edit_snippet?: string
          id?: string
          job_type?: string
          success_rate?: number | null
          updated_at?: string
          usage_count?: number | null
        }
        Relationships: []
      }
      withdrawals: {
        Row: {
          admin_notes: string | null
          amount: number
          created_at: string
          email: string
          id: string
          referral_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          created_at?: string
          email: string
          id?: string
          referral_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          created_at?: string
          email?: string
          id?: string
          referral_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdrawals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_api_usage: {
        Row: {
          created_at: string
          gpt_cost_usd: number | null
          id: string
          period_month: string
          total_requests: number | null
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          gpt_cost_usd?: number | null
          id?: string
          period_month: string
          total_requests?: number | null
          updated_at?: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          gpt_cost_usd?: number | null
          id?: string
          period_month?: string
          total_requests?: number | null
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_api_usage_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_referrals: {
        Row: {
          commission_earned: number | null
          commission_rate: number | null
          conversion_value: number | null
          created_at: string
          id: string
          referred_user_id: string
          status: string | null
          workspace_id: string
        }
        Insert: {
          commission_earned?: number | null
          commission_rate?: number | null
          conversion_value?: number | null
          created_at?: string
          id?: string
          referred_user_id: string
          status?: string | null
          workspace_id: string
        }
        Update: {
          commission_earned?: number | null
          commission_rate?: number | null
          conversion_value?: number | null
          created_at?: string
          id?: string
          referred_user_id?: string
          status?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_referrals_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_usage_analytics: {
        Row: {
          id: string
          metadata: Json | null
          metric_type: string
          metric_value: number | null
          recorded_at: string
          user_id: string | null
          workspace_id: string
        }
        Insert: {
          id?: string
          metadata?: Json | null
          metric_type: string
          metric_value?: number | null
          recorded_at?: string
          user_id?: string | null
          workspace_id: string
        }
        Update: {
          id?: string
          metadata?: Json | null
          metric_type?: string
          metric_value?: number | null
          recorded_at?: string
          user_id?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_usage_analytics_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_users: {
        Row: {
          id: string
          joined_at: string
          role: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          role?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_users_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          affiliate_tag: string | null
          branding: Json | null
          created_at: string
          custom_domain: string | null
          gpt_monthly_limit: number | null
          id: string
          is_active: boolean | null
          name: string
          owner_id: string
          subdomain: string | null
          updated_at: string
        }
        Insert: {
          affiliate_tag?: string | null
          branding?: Json | null
          created_at?: string
          custom_domain?: string | null
          gpt_monthly_limit?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          owner_id: string
          subdomain?: string | null
          updated_at?: string
        }
        Update: {
          affiliate_tag?: string | null
          branding?: Json | null
          created_at?: string
          custom_domain?: string | null
          gpt_monthly_limit?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          owner_id?: string
          subdomain?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      barber_badge_stats: {
        Row: {
          barber_id: string | null
          fastest_growing_badges: number | null
          full_name: string | null
          highest_score_badges: number | null
          latest_badge_date: string | null
          location: string | null
          most_remixed_badges: number | null
          remix_king_badges: number | null
          total_badges: number | null
        }
        Relationships: []
      }
      barber_leaderboard: {
        Row: {
          badge: string | null
          full_name: string | null
          id: string | null
          rank: number | null
          ranking_points: number | null
          weekly_growth: number | null
        }
        Relationships: []
      }
      barber_share_analytics: {
        Row: {
          barber_id: string | null
          conversion_rate_percent: number | null
          facebook_clicks: number | null
          full_name: string | null
          instagram_clicks: number | null
          location: string | null
          tiktok_clicks: number | null
          total_attribution_value: number | null
          total_clicks: number | null
          total_conversions: number | null
          twitter_clicks: number | null
          unique_sessions: number | null
        }
        Relationships: []
      }
      click_rate_limits: {
        Row: {
          click_count: number | null
          first_click: string | null
          ip: string | null
          last_click: string | null
          platform: string | null
          ref: string | null
        }
        Relationships: []
      }
      client_appointment_patterns: {
        Row: {
          avg_days_between_cuts: number | null
          barber_id: string | null
          client_id: string | null
          client_name: string | null
          completion_rate: number | null
          cuts_used_this_month: number | null
          days_since_last_cut: number | null
          last_appointment_date: string | null
          no_show_count: number | null
          pattern_based_next_date: string | null
          preferred_day_of_week: number | null
          preferred_time_slot: string | null
          subscription_status: string | null
          total_appointments: number | null
        }
        Relationships: []
      }
      client_streak_leaderboard: {
        Row: {
          badge: string | null
          full_name: string | null
          id: string | null
          rank: number | null
          streak_count: number | null
        }
        Relationships: []
      }
      current_week_badge_winners: {
        Row: {
          achievement_value: number | null
          badge_description: string | null
          badge_emoji: string | null
          badge_name: string | null
          badge_type: string | null
          barber_id: string | null
          created_at: string | null
          full_name: string | null
          location: string | null
          week_start_date: string | null
        }
        Relationships: []
      }
      cut_streak_leaderboard: {
        Row: {
          barber_id: string | null
          barber_location: string | null
          barber_name: string | null
          barber_rank: number | null
          client_id: string | null
          client_name: string | null
          current_streak: number | null
          global_rank: number | null
          is_hall_of_fame: boolean | null
          last_cut_date: string | null
          milestone_emoji: string | null
          streak_updated_at: string | null
          tier: string | null
        }
        Relationships: []
      }
      evolution_leaderboard: {
        Row: {
          barber_id: string | null
          evolution_rank: number | null
          evolved_captions_count: number | null
          full_name: string | null
          last_evolution: string | null
          location: string | null
          paid_rewards: number | null
          pending_rewards: number | null
          total_evolution_rewards: number | null
          total_rewards: number | null
          user_id: string | null
        }
        Relationships: []
      }
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown | null
          f_table_catalog: unknown | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown | null
          f_table_catalog: string | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      regional_barber_stats: {
        Row: {
          active_barbers: number | null
          avg_dna_score: number | null
          borough: string | null
          city: string | null
          location: string | null
          top_dna_score: number | null
          total_barbers: number | null
          verified_viral_barbers: number | null
        }
        Relationships: []
      }
      regional_viral_leaderboard: {
        Row: {
          barber_id: string | null
          borough: string | null
          borough_rank: number | null
          city: string | null
          city_rank: number | null
          dna_score: number | null
          dna_tier: string | null
          full_name: string | null
          global_rank: number | null
          high_impact_keywords: Json | null
          instagram_handle: string | null
          latitude: number | null
          location: string | null
          longitude: number | null
          price_range: string | null
          profile_photo_url: string | null
          rating: number | null
          services_offered: string[] | null
          top_performing_emojis: Json | null
          top_performing_tones: Json | null
          total_tests: number | null
          user_id: string | null
        }
        Relationships: []
      }
      regional_viral_leaderboard_enhanced: {
        Row: {
          barber_id: string | null
          borough: string | null
          borough_rank: number | null
          city: string | null
          city_rank: number | null
          dna_score: number | null
          dna_tier: string | null
          full_name: string | null
          global_rank: number | null
          high_impact_keywords: Json | null
          instagram_handle: string | null
          latitude: number | null
          location: string | null
          longitude: number | null
          parent_region_name: string | null
          parent_region_slug: string | null
          price_range: string | null
          profile_photo_url: string | null
          rating: number | null
          region_name: string | null
          region_slug: string | null
          region_type: Database["public"]["Enums"]["region_type"] | null
          services_offered: string[] | null
          top_performing_emojis: Json | null
          top_performing_tones: Json | null
          total_tests: number | null
          user_id: string | null
        }
        Relationships: []
      }
      trending_searches: {
        Row: {
          avg_results: number | null
          last_searched: string | null
          search_count: number | null
          search_query: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: { oldname: string; newname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { tbl: unknown; col: string }
        Returns: unknown
      }
      _postgis_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_scripts_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_selectivity: {
        Args: { tbl: unknown; att_name: string; geom: unknown; mode?: string }
        Returns: number
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_bestsrid: {
        Args: { "": unknown }
        Returns: number
      }
      _st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_coveredby: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_covers: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_intersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_pointoutside: {
        Args: { "": unknown }
        Returns: unknown
      }
      _st_sortablehash: {
        Args: { geom: unknown }
        Returns: number
      }
      _st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          g1: unknown
          clip?: unknown
          tolerance?: number
          return_polygons?: boolean
        }
        Returns: unknown
      }
      _st_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      addauth: {
        Args: { "": string }
        Returns: boolean
      }
      addgeometrycolumn: {
        Args:
          | {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
              new_srid_in: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
          | {
              schema_name: string
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
          | {
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
        Returns: string
      }
      approve_referral_payout: {
        Args: { p_payout_id: string; p_admin_notes?: string }
        Returns: boolean
      }
      box: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box2d: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box2d_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2d_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2df_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2df_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3d: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box3d_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3d_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3dtobox: {
        Args: { "": unknown }
        Returns: unknown
      }
      bytea: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      calculate_client_streak: {
        Args: { client_id_param: string; barber_id_param: string }
        Returns: number
      }
      calculate_engagement_score: {
        Args: { views: number; clicks: number; days_since_posted: number }
        Returns: number
      }
      calculate_mood_from_score: {
        Args: { score_val: number }
        Returns: string
      }
      calculate_next_appointment_date: {
        Args: { plan_cuts_per_month: number; last_appointment_date?: string }
        Returns: string
      }
      calculate_plan_end_date: {
        Args: { start_date: string; cuts_included: number }
        Returns: string
      }
      calculate_pod_viral_score: {
        Args: { pod_id_param: string }
        Returns: number
      }
      calculate_test_confidence: {
        Args: {
          a_clicks: number
          b_clicks: number
          a_conversions: number
          b_conversions: number
        }
        Returns: number
      }
      calculate_tier: {
        Args: { referral_count: number }
        Returns: string
      }
      calculate_weekly_badges: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      can_unlock_job_via_share: {
        Args: { user_id_param: string; job_id_param: string }
        Returns: boolean
      }
      check_and_award_badges: {
        Args: { user_id_param: string }
        Returns: {
          new_badge_type: string
          new_badge_name: string
          new_badge_emoji: string
        }[]
      }
      check_job_application: {
        Args: { p_job_id: string; p_source: string; p_user_id: string }
        Returns: boolean
      }
      check_rate_limit: {
        Args: { api_key_param: string }
        Returns: boolean
      }
      check_time_slot_availability: {
        Args: { barber_id_param: string; appointment_date_param: string }
        Returns: boolean
      }
      check_workspace_gpt_quota: {
        Args: { workspace_id_param: string }
        Returns: boolean
      }
      create_job_application: {
        Args: {
          p_job_id: string
          p_source: string
          p_applicant_id: string
          p_notes?: string
        }
        Returns: string
      }
      disablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      dropgeometrycolumn: {
        Args:
          | {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
            }
          | { schema_name: string; table_name: string; column_name: string }
          | { table_name: string; column_name: string }
        Returns: string
      }
      dropgeometrytable: {
        Args:
          | { catalog_name: string; schema_name: string; table_name: string }
          | { schema_name: string; table_name: string }
          | { table_name: string }
        Returns: string
      }
      enablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      generate_api_key: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_barber_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_campaign_id: {
        Args: { p_city: string; p_job_type: string }
        Returns: string
      }
      generate_client_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_creator_ref_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_creator_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_pod_invite_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_promoter_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_referral_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_share_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_short_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_va_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_workspace_subdomain: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      geography: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      geography_analyze: {
        Args: { "": unknown }
        Returns: boolean
      }
      geography_gist_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_gist_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_send: {
        Args: { "": unknown }
        Returns: string
      }
      geography_spgist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      geography_typmod_out: {
        Args: { "": number }
        Returns: unknown
      }
      geometry: {
        Args:
          | { "": string }
          | { "": string }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
        Returns: unknown
      }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_analyze: {
        Args: { "": unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gist_compress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_decompress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_decompress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_sortsupport_2d: {
        Args: { "": unknown }
        Returns: undefined
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_hash: {
        Args: { "": unknown }
        Returns: number
      }
      geometry_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_recv: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_send: {
        Args: { "": unknown }
        Returns: string
      }
      geometry_sortsupport: {
        Args: { "": unknown }
        Returns: undefined
      }
      geometry_spgist_compress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_spgist_compress_3d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_spgist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      geometry_typmod_out: {
        Args: { "": number }
        Returns: unknown
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometrytype: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      geomfromewkb: {
        Args: { "": string }
        Returns: unknown
      }
      geomfromewkt: {
        Args: { "": string }
        Returns: unknown
      }
      get_available_evolution_balance: {
        Args: { barber_uuid: string }
        Returns: number
      }
      get_available_referral_balance: {
        Args: { barber_uuid: string }
        Returns: number
      }
      get_expiring_plans: {
        Args: { days_ahead?: number }
        Returns: {
          client_id: string
          barber_id: string
          plan_id: string
          client_name: string
          client_email: string
          client_phone: string
          plan_name: string
          price_per_month: number
          cuts_included: number
          cuts_used_this_month: number
          plan_end_date: string
          days_until_expiry: number
        }[]
      }
      get_expiring_plans_for_bonus: {
        Args: { barber_id_param: string; days_ahead?: number }
        Returns: {
          client_id: string
          client_name: string
          client_email: string
          plan_id: string
          plan_name: string
          plan_end_date: string
          days_until_expiry: number
          has_active_bonus: boolean
        }[]
      }
      get_live_leaderboard: {
        Args: { time_period?: string; limit_count?: number }
        Returns: {
          barber_id: string
          full_name: string
          location: string
          total_referrals: number
          total_earnings: number
          rank_position: number
          rank_movement: number
        }[]
      }
      get_mood_emoji: {
        Args: { mood_score: number }
        Returns: string
      }
      get_proj4_from_srid: {
        Args: { "": number }
        Returns: string
      }
      get_referral_analytics: {
        Args: { referrer_id_param?: string }
        Returns: {
          referrerid: string
          total_referrals: number
          awarded_bonuses: number
          flagged_referrals: number
          unique_ips: number
          duplicate_ip_referrals: number
        }[]
      }
      get_session_by_share_code: {
        Args: { code: string }
        Returns: {
          id: string
          title: string
          description: string
          creator_id: string
          is_active: boolean
          expires_at: string
          created_at: string
        }[]
      }
      get_smart_prompt_recommendations: {
        Args: { user_id_param: string }
        Returns: {
          prompt_id: string
          title: string
          content: string
          creator_name: string
          creator_avatar: string
          category: string
          tags: string[]
          price: number
          reason_for_recommendation: string
          match_score: number
        }[]
      }
      get_user_rank: {
        Args: { user_id_param: string; time_period?: string }
        Returns: {
          rank_position: number
          total_referrals: number
          total_earnings: number
          rank_movement: number
          referrals_to_next_rank: number
        }[]
      }
      gettransactionid: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      gidx_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gidx_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      increment_job_views: {
        Args: { job_id_param: string }
        Returns: number
      }
      increment_prompt_stat: {
        Args: { prompt_id_param: string; stat_type: string }
        Returns: undefined
      }
      increment_workspace_gpt_usage: {
        Args: { workspace_id_param: string; cost_param?: number }
        Returns: undefined
      }
      insert_craigslist_post: {
        Args: {
          p_variant: string
          p_title: string
          p_body: string
          p_borough: string
          p_job_type: string
          p_used: boolean
          p_utm_link: string
        }
        Returns: string
      }
      is_user_admin: {
        Args: { user_email: string }
        Returns: boolean
      }
      json: {
        Args: { "": unknown }
        Returns: Json
      }
      jsonb: {
        Args: { "": unknown }
        Returns: Json
      }
      log_api_usage: {
        Args: {
          user_id_param: string
          api_key_param: string
          endpoint_param: string
          platform_param?: string
          success_param?: boolean
          error_message_param?: string
          request_data_param?: Json
          response_data_param?: Json
        }
        Returns: string
      }
      longtransactionsenabled: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      manage_urgency_badges: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      path: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_asflatgeobuf_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asgeobuf_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asmvt_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asmvt_serialfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_geometry_clusterintersecting_finalfn: {
        Args: { "": unknown }
        Returns: unknown[]
      }
      pgis_geometry_clusterwithin_finalfn: {
        Args: { "": unknown }
        Returns: unknown[]
      }
      pgis_geometry_collect_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_makeline_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_polygonize_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_serialfn: {
        Args: { "": unknown }
        Returns: string
      }
      point: {
        Args: { "": unknown }
        Returns: unknown
      }
      polygon: {
        Args: { "": unknown }
        Returns: unknown
      }
      populate_geometry_columns: {
        Args:
          | { tbl_oid: unknown; use_typmod?: boolean }
          | { use_typmod?: boolean }
        Returns: string
      }
      postgis_addbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_constraint_dims: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: string
      }
      postgis_dropbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_extensions_upgrade: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_full_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_geos_noop: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_geos_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_getbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_hasbbox: {
        Args: { "": unknown }
        Returns: boolean
      }
      postgis_index_supportfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_lib_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_revision: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libjson_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_liblwgeom_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libprotobuf_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libxml_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_noop: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_proj_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_installed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_released: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_svn_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_type_name: {
        Args: {
          geomname: string
          coord_dimension: number
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_typmod_dims: {
        Args: { "": number }
        Returns: number
      }
      postgis_typmod_srid: {
        Args: { "": number }
        Returns: number
      }
      postgis_typmod_type: {
        Args: { "": number }
        Returns: string
      }
      postgis_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_wagyu_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      process_referral_bonus: {
        Args: {
          referrer_profile_id: string
          referred_profile_id: string
          ref_code: string
          ref_type: string
        }
        Returns: boolean
      }
      process_signup_attribution: {
        Args: {
          p_user_id: string
          p_referrer_barber_id: string
          p_share_platform: string
          p_caption_tone?: string
          p_week_date?: string
          p_clicked_at?: string
          p_share_click_id?: string
        }
        Returns: string
      }
      reject_referral_payout: {
        Args: { p_payout_id: string; p_admin_notes?: string }
        Returns: boolean
      }
      request_referral_payout: {
        Args: { p_amount_cents: number; p_payout_email?: string }
        Returns: string
      }
      reset_monthly_cuts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      save_weekly_leaderboard_snapshot: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      schedule_job_reminder: {
        Args: {
          p_user_id: string
          p_job_id: string
          p_job_title: string
          p_company_name: string
          p_email: string
          p_days_ahead?: number
        }
        Returns: string
      }
      search_viral_barbers: {
        Args: {
          search_term?: string
          search_location?: string
          search_tag_type?: string
          limit_count?: number
        }
        Returns: {
          barber_id: string
          full_name: string
          location: string
          borough: string
          latitude: number
          longitude: number
          dna_score: number
          dna_tier: string
          matching_tags: string[]
          profile_photo_url: string
          instagram_handle: string
          rating: number
          borough_rank: number
        }[]
      }
      spheroid_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      spheroid_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlength: {
        Args: { "": unknown }
        Returns: number
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dperimeter: {
        Args: { "": unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle: {
        Args:
          | { line1: unknown; line2: unknown }
          | { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
        Returns: number
      }
      st_area: {
        Args:
          | { "": string }
          | { "": unknown }
          | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_area2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_asbinary: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkb: {
        Args: { "": unknown }
        Returns: string
      }
      st_asewkt: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      st_asgeojson: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; options?: number }
          | { geom: unknown; maxdecimaldigits?: number; options?: number }
          | {
              r: Record<string, unknown>
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
            }
        Returns: string
      }
      st_asgml: {
        Args:
          | { "": string }
          | {
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
          | { geom: unknown; maxdecimaldigits?: number; options?: number }
          | {
              version: number
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
          | {
              version: number
              geom: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
        Returns: string
      }
      st_ashexewkb: {
        Args: { "": unknown }
        Returns: string
      }
      st_askml: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
          | { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
        Returns: string
      }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: {
        Args: { geom: unknown; format?: string }
        Returns: string
      }
      st_asmvtgeom: {
        Args: {
          geom: unknown
          bounds: unknown
          extent?: number
          buffer?: number
          clip_geom?: boolean
        }
        Returns: unknown
      }
      st_assvg: {
        Args:
          | { "": string }
          | { geog: unknown; rel?: number; maxdecimaldigits?: number }
          | { geom: unknown; rel?: number; maxdecimaldigits?: number }
        Returns: string
      }
      st_astext: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      st_astwkb: {
        Args:
          | {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
          | {
              geom: unknown
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
        Returns: string
      }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_boundary: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_boundingdiagonal: {
        Args: { geom: unknown; fits?: boolean }
        Returns: unknown
      }
      st_buffer: {
        Args:
          | { geom: unknown; radius: number; options?: string }
          | { geom: unknown; radius: number; quadsegs: number }
        Returns: unknown
      }
      st_buildarea: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_centroid: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      st_cleangeometry: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_clipbybox2d: {
        Args: { geom: unknown; box: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_clusterintersecting: {
        Args: { "": unknown[] }
        Returns: unknown[]
      }
      st_collect: {
        Args: { "": unknown[] } | { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collectionextract: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_collectionhomogenize: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_concavehull: {
        Args: {
          param_geom: unknown
          param_pctconvex: number
          param_allow_holes?: boolean
        }
        Returns: unknown
      }
      st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_convexhull: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_coorddim: {
        Args: { geometry: unknown }
        Returns: number
      }
      st_coveredby: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_covers: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_curvetoline: {
        Args: { geom: unknown; tol?: number; toltype?: number; flags?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { g1: unknown; tolerance?: number; flags?: number }
        Returns: unknown
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_dimension: {
        Args: { "": unknown }
        Returns: number
      }
      st_disjoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_distance: {
        Args:
          | { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
          | { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_distancesphere: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { geom1: unknown; geom2: unknown; radius: number }
        Returns: number
      }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_dump: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumppoints: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumprings: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpsegments: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_endpoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_envelope: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_expand: {
        Args:
          | { box: unknown; dx: number; dy: number }
          | { box: unknown; dx: number; dy: number; dz?: number }
          | { geom: unknown; dx: number; dy: number; dz?: number; dm?: number }
        Returns: unknown
      }
      st_exteriorring: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_flipcoordinates: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_force2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_force3d: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; zvalue?: number; mvalue?: number }
        Returns: unknown
      }
      st_forcecollection: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcecurve: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcepolygonccw: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcepolygoncw: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcerhr: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcesfs: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_generatepoints: {
        Args:
          | { area: unknown; npoints: number }
          | { area: unknown; npoints: number; seed: number }
        Returns: unknown
      }
      st_geogfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geogfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geographyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geohash: {
        Args:
          | { geog: unknown; maxchars?: number }
          | { geom: unknown; maxchars?: number }
        Returns: string
      }
      st_geomcollfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomcollfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geometricmedian: {
        Args: {
          g: unknown
          tolerance?: number
          max_iter?: number
          fail_if_not_converged?: boolean
        }
        Returns: unknown
      }
      st_geometryfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geometrytype: {
        Args: { "": unknown }
        Returns: string
      }
      st_geomfromewkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromewkt: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromgeojson: {
        Args: { "": Json } | { "": Json } | { "": string }
        Returns: unknown
      }
      st_geomfromgml: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromkml: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfrommarc21: {
        Args: { marc21xml: string }
        Returns: unknown
      }
      st_geomfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromtwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_gmltosql: {
        Args: { "": string }
        Returns: unknown
      }
      st_hasarc: {
        Args: { geometry: unknown }
        Returns: boolean
      }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { size: number; cell_i: number; cell_j: number; origin?: unknown }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { size: number; bounds: unknown }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_intersection: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_intersects: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_isclosed: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_iscollection: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isempty: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_ispolygonccw: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_ispolygoncw: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isring: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_issimple: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isvalid: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isvaliddetail: {
        Args: { geom: unknown; flags?: number }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
      }
      st_isvalidreason: {
        Args: { "": unknown }
        Returns: string
      }
      st_isvalidtrajectory: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_length: {
        Args:
          | { "": string }
          | { "": unknown }
          | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_length2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_letters: {
        Args: { letters: string; font?: Json }
        Returns: unknown
      }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { txtin: string; nprecision?: number }
        Returns: unknown
      }
      st_linefrommultipoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_linefromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_linefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linemerge: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_linestringfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_linetocurve: {
        Args: { geometry: unknown }
        Returns: unknown
      }
      st_locatealong: {
        Args: { geometry: unknown; measure: number; leftrightoffset?: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          geometry: unknown
          frommeasure: number
          tomeasure: number
          leftrightoffset?: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { geometry: unknown; fromelevation: number; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_m: {
        Args: { "": unknown }
        Returns: number
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeline: {
        Args: { "": unknown[] } | { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makepolygon: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { "": unknown } | { geom: unknown; params: string }
        Returns: unknown
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_maximuminscribedcircle: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_memsize: {
        Args: { "": unknown }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_minimumboundingradius: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_minimumclearance: {
        Args: { "": unknown }
        Returns: number
      }
      st_minimumclearanceline: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_mlinefromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mlinefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpolyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpolyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multi: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_multilinefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multilinestringfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipolyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipolygonfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_ndims: {
        Args: { "": unknown }
        Returns: number
      }
      st_node: {
        Args: { g: unknown }
        Returns: unknown
      }
      st_normalize: {
        Args: { geom: unknown }
        Returns: unknown
      }
      st_npoints: {
        Args: { "": unknown }
        Returns: number
      }
      st_nrings: {
        Args: { "": unknown }
        Returns: number
      }
      st_numgeometries: {
        Args: { "": unknown }
        Returns: number
      }
      st_numinteriorring: {
        Args: { "": unknown }
        Returns: number
      }
      st_numinteriorrings: {
        Args: { "": unknown }
        Returns: number
      }
      st_numpatches: {
        Args: { "": unknown }
        Returns: number
      }
      st_numpoints: {
        Args: { "": unknown }
        Returns: number
      }
      st_offsetcurve: {
        Args: { line: unknown; distance: number; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_orientedenvelope: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { "": unknown } | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_perimeter2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_pointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_pointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_pointm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointonsurface: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_points: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_polyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_polyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonize: {
        Args: { "": unknown[] }
        Returns: unknown
      }
      st_project: {
        Args: { geog: unknown; distance: number; azimuth: number }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_x: number
          prec_y?: number
          prec_z?: number
          prec_m?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: string
      }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_reverse: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setsrid: {
        Args: { geog: unknown; srid: number } | { geom: unknown; srid: number }
        Returns: unknown
      }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shiftlongitude: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; vertex_fraction: number; is_outer?: boolean }
        Returns: unknown
      }
      st_split: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_square: {
        Args: { size: number; cell_i: number; cell_j: number; origin?: unknown }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { size: number; bounds: unknown }
        Returns: Record<string, unknown>[]
      }
      st_srid: {
        Args: { geog: unknown } | { geom: unknown }
        Returns: number
      }
      st_startpoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_subdivide: {
        Args: { geom: unknown; maxvertices?: number; gridsize?: number }
        Returns: unknown[]
      }
      st_summary: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          zoom: number
          x: number
          y: number
          bounds?: unknown
          margin?: number
        }
        Returns: unknown
      }
      st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_transform: {
        Args:
          | { geom: unknown; from_proj: string; to_proj: string }
          | { geom: unknown; from_proj: string; to_srid: number }
          | { geom: unknown; to_proj: string }
        Returns: unknown
      }
      st_triangulatepolygon: {
        Args: { g1: unknown }
        Returns: unknown
      }
      st_union: {
        Args:
          | { "": unknown[] }
          | { geom1: unknown; geom2: unknown }
          | { geom1: unknown; geom2: unknown; gridsize: number }
        Returns: unknown
      }
      st_voronoilines: {
        Args: { g1: unknown; tolerance?: number; extend_to?: unknown }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { g1: unknown; tolerance?: number; extend_to?: unknown }
        Returns: unknown
      }
      st_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_wkbtosql: {
        Args: { wkb: string }
        Returns: unknown
      }
      st_wkttosql: {
        Args: { "": string }
        Returns: unknown
      }
      st_wrapx: {
        Args: { geom: unknown; wrap: number; move: number }
        Returns: unknown
      }
      st_x: {
        Args: { "": unknown }
        Returns: number
      }
      st_xmax: {
        Args: { "": unknown }
        Returns: number
      }
      st_xmin: {
        Args: { "": unknown }
        Returns: number
      }
      st_y: {
        Args: { "": unknown }
        Returns: number
      }
      st_ymax: {
        Args: { "": unknown }
        Returns: number
      }
      st_ymin: {
        Args: { "": unknown }
        Returns: number
      }
      st_z: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmax: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmflag: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmin: {
        Args: { "": unknown }
        Returns: number
      }
      suggest_pod_teammates: {
        Args: { user_id_param: string; limit_param?: number }
        Returns: {
          suggested_user_id: string
          compatibility_score: number
          shared_tags: string[]
          viral_potential: number
          reason_for_suggestion: string
        }[]
      }
      test_evolution_notification: {
        Args: { user_id_param: string }
        Returns: Json
      }
      text: {
        Args: { "": unknown }
        Returns: string
      }
      track_share_click: {
        Args:
          | {
              p_referrer_barber_id: string
              p_week_date: string
              p_platform: string
              p_tone?: string
              p_session_id?: string
              p_user_agent?: string
              p_referrer_url?: string
              p_utm_source?: string
              p_utm_medium?: string
              p_utm_campaign?: string
            }
          | {
              p_referrer_barber_id: string
              p_week_date: string
              p_platform: string
              p_tone?: string
              p_session_id?: string
              p_user_agent?: string
              p_referrer_url?: string
              p_utm_source?: string
              p_utm_medium?: string
              p_utm_campaign?: string
              p_ip_address?: string
            }
        Returns: string
      }
      track_weekly_mood_counts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      trigger_auto_share_reminders: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      trigger_manual_rebooking_optimization: {
        Args: Record<PropertyKey, never>
        Returns: {
          barber_id: string
          optimization_triggered: boolean
        }[]
      }
      trigger_mood_ring_update: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      unlock_job_via_share: {
        Args: {
          user_id_param: string
          job_id_param: string
          platform_param: string
          share_url_param: string
        }
        Returns: boolean
      }
      unlockrows: {
        Args: { "": string }
        Returns: number
      }
      update_caption_hall_of_fame: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_city_mood_rankings: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_city_stats: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_leaderboard_rankings: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_referral_stats: {
        Args: { ref_code: string }
        Returns: undefined
      }
      update_user_badge: {
        Args: { user_id: string }
        Returns: undefined
      }
      update_user_flag_status: {
        Args: { target_user_id: string; is_flagged: boolean }
        Returns: boolean
      }
      update_withdrawal_status: {
        Args: { withdrawal_id: string; new_status: string; notes?: string }
        Returns: boolean
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          schema_name: string
          table_name: string
          column_name: string
          new_srid_in: number
        }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      mood_ring_status: "cooling" | "warming" | "hot" | "viral"
      region_type: "country" | "city" | "borough"
      reward_type: "gift_card" | "streak_boost" | "free_cut" | "credit"
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown | null
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      mood_ring_status: ["cooling", "warming", "hot", "viral"],
      region_type: ["country", "city", "borough"],
      reward_type: ["gift_card", "streak_boost", "free_cut", "credit"],
    },
  },
} as const
