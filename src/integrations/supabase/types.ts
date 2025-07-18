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
      alert_optins: {
        Row: {
          city: string
          consent: boolean
          created_at: string
          email: string | null
          first_name: string
          id: string
          job_type: string
          phone_number: string
          utm_source: string | null
        }
        Insert: {
          city: string
          consent?: boolean
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          job_type: string
          phone_number: string
          utm_source?: string | null
        }
        Update: {
          city?: string
          consent?: boolean
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          job_type?: string
          phone_number?: string
          utm_source?: string | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          availability: string | null
          created_at: string
          full_name: string
          id: string
          job_id: string | null
          location: string | null
          media_type: string | null
          media_url: string | null
          phone: string | null
          ref_code: string | null
          referral_code: string | null
          resume_url: string | null
          skills: string | null
          source: string | null
          submitted_at: string
          updated_at: string
          utm_ref: string | null
        }
        Insert: {
          availability?: string | null
          created_at?: string
          full_name: string
          id?: string
          job_id?: string | null
          location?: string | null
          media_type?: string | null
          media_url?: string | null
          phone?: string | null
          ref_code?: string | null
          referral_code?: string | null
          resume_url?: string | null
          skills?: string | null
          source?: string | null
          submitted_at?: string
          updated_at?: string
          utm_ref?: string | null
        }
        Update: {
          availability?: string | null
          created_at?: string
          full_name?: string
          id?: string
          job_id?: string | null
          location?: string | null
          media_type?: string | null
          media_url?: string | null
          phone?: string | null
          ref_code?: string | null
          referral_code?: string | null
          resume_url?: string | null
          skills?: string | null
          source?: string | null
          submitted_at?: string
          updated_at?: string
          utm_ref?: string | null
        }
        Relationships: []
      }
      craigslist_applications: {
        Row: {
          city: string | null
          created_at: string
          id: string
          ip_address: string | null
          job_id: string
          submitted_at: string
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          variant: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          job_id: string
          submitted_at?: string
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          variant?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          job_id?: string
          submitted_at?: string
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          variant?: string | null
        }
        Relationships: []
      }
      craigslist_posts: {
        Row: {
          city: string
          clicks: number
          id: string
          job_type: string
          posted_at: string
          repost_at: string | null
          status: Database["public"]["Enums"]["post_status"]
          variant_id: string
          views: number
        }
        Insert: {
          city: string
          clicks?: number
          id?: string
          job_type: string
          posted_at?: string
          repost_at?: string | null
          status?: Database["public"]["Enums"]["post_status"]
          variant_id: string
          views?: number
        }
        Update: {
          city?: string
          clicks?: number
          id?: string
          job_type?: string
          posted_at?: string
          repost_at?: string | null
          status?: Database["public"]["Enums"]["post_status"]
          variant_id?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "craigslist_posts_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "post_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          application_status: string
          applied_at: string
          created_at: string
          email: string | null
          first_name: string
          id: string
          job_id: string
          job_title: string | null
          job_type: string | null
          location: string | null
          phone_number: string
          resume_text: string | null
          source: string | null
          updated_at: string
        }
        Insert: {
          application_status?: string
          applied_at?: string
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          job_id: string
          job_title?: string | null
          job_type?: string | null
          location?: string | null
          phone_number: string
          resume_text?: string | null
          source?: string | null
          updated_at?: string
        }
        Update: {
          application_status?: string
          applied_at?: string
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          job_id?: string
          job_title?: string | null
          job_type?: string | null
          location?: string | null
          phone_number?: string
          resume_text?: string | null
          source?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_job_applications_job_id"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          application_link: string | null
          approved_at: string | null
          approved_by: string | null
          benefits: string | null
          company: string
          contact_method: string | null
          created_at: string
          description: string
          employer_name: string
          id: string
          is_approved: boolean | null
          is_verified: boolean | null
          job_type: string | null
          location: string
          pay_range: string | null
          posted_at: string
          posted_by: string | null
          requirements: string | null
          status: string | null
          title: string
          updated_at: string | null
          utm_source: string | null
        }
        Insert: {
          application_link?: string | null
          approved_at?: string | null
          approved_by?: string | null
          benefits?: string | null
          company: string
          contact_method?: string | null
          created_at?: string
          description: string
          employer_name: string
          id?: string
          is_approved?: boolean | null
          is_verified?: boolean | null
          job_type?: string | null
          location: string
          pay_range?: string | null
          posted_at?: string
          posted_by?: string | null
          requirements?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          utm_source?: string | null
        }
        Update: {
          application_link?: string | null
          approved_at?: string | null
          approved_by?: string | null
          benefits?: string | null
          company?: string
          contact_method?: string | null
          created_at?: string
          description?: string
          employer_name?: string
          id?: string
          is_approved?: boolean | null
          is_verified?: boolean | null
          job_type?: string | null
          location?: string
          pay_range?: string | null
          posted_at?: string
          posted_by?: string | null
          requirements?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      post_variants: {
        Row: {
          city: string
          created_at: string
          created_by: string | null
          id: string
          job_type: string
          variant_body: string
          variant_title: string
        }
        Insert: {
          city: string
          created_at?: string
          created_by?: string | null
          id?: string
          job_type: string
          variant_body: string
          variant_title: string
        }
        Update: {
          city?: string
          created_at?: string
          created_by?: string | null
          id?: string
          job_type?: string
          variant_body?: string
          variant_title?: string
        }
        Relationships: []
      }
      referral_attributions: {
        Row: {
          application_id: string | null
          city: string | null
          id: string
          job_id: string
          referral_code: string
          submitted_at: string
        }
        Insert: {
          application_id?: string | null
          city?: string | null
          id?: string
          job_id: string
          referral_code: string
          submitted_at?: string
        }
        Update: {
          application_id?: string | null
          city?: string | null
          id?: string
          job_id?: string
          referral_code?: string
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_attributions_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_clicks: {
        Row: {
          city: string | null
          clicked_at: string
          id: string
          ip_address: string | null
          job_id: string
          referral_code: string
          user_agent: string | null
        }
        Insert: {
          city?: string | null
          clicked_at?: string
          id?: string
          ip_address?: string | null
          job_id: string
          referral_code: string
          user_agent?: string | null
        }
        Update: {
          city?: string | null
          clicked_at?: string
          id?: string
          ip_address?: string | null
          job_id?: string
          referral_code?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      search_events: {
        Row: {
          created_at: string
          event_type: string
          filter_applied: string | null
          id: string
          ip_address: string | null
          job_id: string | null
          job_type: string | null
          location: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          filter_applied?: string | null
          id?: string
          ip_address?: string | null
          job_id?: string | null
          job_type?: string | null
          location?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          filter_applied?: string | null
          id?: string
          ip_address?: string | null
          job_id?: string | null
          job_type?: string | null
          location?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      sms_attributions: {
        Row: {
          converted_url: string | null
          created_at: string
          event_type: string
          id: string
          message_id: string | null
          phone_number: string
          timestamp: string
          value: number | null
        }
        Insert: {
          converted_url?: string | null
          created_at?: string
          event_type: string
          id?: string
          message_id?: string | null
          phone_number: string
          timestamp?: string
          value?: number | null
        }
        Update: {
          converted_url?: string | null
          created_at?: string
          event_type?: string
          id?: string
          message_id?: string | null
          phone_number?: string
          timestamp?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sms_attributions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "sms_blast_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_blast_logs: {
        Row: {
          ab_test_id: string | null
          city: string | null
          click_id: string | null
          click_tracking_url: string | null
          id: string
          is_ab_test: boolean | null
          job_type: string | null
          message: string
          phone_number: string
          redirect_url: string | null
          sent_at: string
          status: string
          utm_campaign: string | null
          utm_source: string | null
          variant_label: string | null
        }
        Insert: {
          ab_test_id?: string | null
          city?: string | null
          click_id?: string | null
          click_tracking_url?: string | null
          id?: string
          is_ab_test?: boolean | null
          job_type?: string | null
          message: string
          phone_number: string
          redirect_url?: string | null
          sent_at?: string
          status?: string
          utm_campaign?: string | null
          utm_source?: string | null
          variant_label?: string | null
        }
        Update: {
          ab_test_id?: string | null
          city?: string | null
          click_id?: string | null
          click_tracking_url?: string | null
          id?: string
          is_ab_test?: boolean | null
          job_type?: string | null
          message?: string
          phone_number?: string
          redirect_url?: string | null
          sent_at?: string
          status?: string
          utm_campaign?: string | null
          utm_source?: string | null
          variant_label?: string | null
        }
        Relationships: []
      }
      sms_clicks: {
        Row: {
          clicked_at: string
          id: string
          ip_address: string | null
          message_id: string | null
          phone_number: string
          redirect_url: string
          user_agent: string | null
          utm_campaign: string | null
          utm_source: string | null
        }
        Insert: {
          clicked_at?: string
          id?: string
          ip_address?: string | null
          message_id?: string | null
          phone_number: string
          redirect_url: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
        }
        Update: {
          clicked_at?: string
          id?: string
          ip_address?: string | null
          message_id?: string | null
          phone_number?: string
          redirect_url?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sms_clicks_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "sms_blast_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      post_status: "posted" | "scheduled" | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
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
      post_status: ["posted", "scheduled", "expired"],
    },
  },
} as const
