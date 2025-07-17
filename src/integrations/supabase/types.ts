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
      applications: {
        Row: {
          availability: string | null
          created_at: string
          full_name: string
          id: string
          location: string | null
          phone: string | null
          referral_code: string | null
          resume_url: string | null
          skills: string | null
          source: string | null
          submitted_at: string
          updated_at: string
        }
        Insert: {
          availability?: string | null
          created_at?: string
          full_name: string
          id?: string
          location?: string | null
          phone?: string | null
          referral_code?: string | null
          resume_url?: string | null
          skills?: string | null
          source?: string | null
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          availability?: string | null
          created_at?: string
          full_name?: string
          id?: string
          location?: string | null
          phone?: string | null
          referral_code?: string | null
          resume_url?: string | null
          skills?: string | null
          source?: string | null
          submitted_at?: string
          updated_at?: string
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
