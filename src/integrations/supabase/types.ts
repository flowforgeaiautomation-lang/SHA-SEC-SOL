export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      application_history: {
        Row: {
          application_id: string
          created_at: string
          id: string
          status: string
        }
        Insert: {
          application_id: string
          created_at?: string
          id?: string
          status: string
        }
        Update: {
          application_id?: string
          created_at?: string
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_history_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          candidate_note: string
          created_at: string
          id: string
          interview_at: string | null
          staff_notes: string
          status: string
          updated_at: string
          user_id: string
          vacancy_id: string
        }
        Insert: {
          candidate_note?: string
          created_at?: string
          id?: string
          interview_at?: string | null
          staff_notes?: string
          status?: string
          updated_at?: string
          user_id: string
          vacancy_id: string
        }
        Update: {
          candidate_note?: string
          created_at?: string
          id?: string
          interview_at?: string | null
          staff_notes?: string
          status?: string
          updated_at?: string
          user_id?: string
          vacancy_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_vacancy_id_fkey"
            columns: ["vacancy_id"]
            isOneToOne: false
            referencedRelation: "vacancies"
            referencedColumns: ["id"]
          },
        ]
      }
      content_history: {
        Row: {
          actor_id: string | null
          content_key: string
          created_at: string
          id: string
        }
        Insert: {
          actor_id?: string | null
          content_key: string
          created_at?: string
          id?: string
        }
        Update: {
          actor_id?: string | null
          content_key?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          city: string
          consent_at: string
          contact_hash: string
          created_at: string
          details: Json
          email: string | null
          follow_up_at: string | null
          id: string
          internal_notes: string
          kind: string
          language: string
          name: string
          phone: string
          reference: string
          status: string
          submission_key: string
        }
        Insert: {
          city: string
          consent_at?: string
          contact_hash: string
          created_at?: string
          details?: Json
          email?: string | null
          follow_up_at?: string | null
          id?: string
          internal_notes?: string
          kind: string
          language?: string
          name: string
          phone: string
          reference: string
          status?: string
          submission_key: string
        }
        Update: {
          city?: string
          consent_at?: string
          contact_hash?: string
          created_at?: string
          details?: Json
          email?: string | null
          follow_up_at?: string | null
          id?: string
          internal_notes?: string
          kind?: string
          language?: string
          name?: string
          phone?: string
          reference?: string
          status?: string
          submission_key?: string
        }
        Relationships: []
      }
      enquiry_history: {
        Row: {
          actor_id: string | null
          change_summary: string
          created_at: string
          enquiry_id: string
          id: string
          new_status: string
          old_status: string
        }
        Insert: {
          actor_id?: string | null
          change_summary: string
          created_at?: string
          enquiry_id: string
          id?: string
          new_status: string
          old_status: string
        }
        Update: {
          actor_id?: string | null
          change_summary?: string
          created_at?: string
          enquiry_id?: string
          id?: string
          new_status?: string
          old_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "enquiry_history_enquiry_id_fkey"
            columns: ["enquiry_id"]
            isOneToOne: false
            referencedRelation: "enquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          accommodation: string
          availability: string
          consent_at: string | null
          experience: string
          full_name: string
          id: string
          job_categories: string
          location: string
          permissions_confirmed: boolean
          phone: string
          preferred_locations: string
          qualifications: string
          serving_personnel: boolean
          skills: string
          training_interests: string
          updated_at: string
        }
        Insert: {
          accommodation?: string
          availability?: string
          consent_at?: string | null
          experience?: string
          full_name?: string
          id: string
          job_categories?: string
          location?: string
          permissions_confirmed?: boolean
          phone?: string
          preferred_locations?: string
          qualifications?: string
          serving_personnel?: boolean
          skills?: string
          training_interests?: string
          updated_at?: string
        }
        Update: {
          accommodation?: string
          availability?: string
          consent_at?: string | null
          experience?: string
          full_name?: string
          id?: string
          job_categories?: string
          location?: string
          permissions_confirmed?: boolean
          phone?: string
          preferred_locations?: string
          qualifications?: string
          serving_personnel?: boolean
          skills?: string
          training_interests?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vacancies: {
        Row: {
          benefits: string
          created_at: string
          deadline: string | null
          eligibility: string
          employer: string
          hours: string
          id: string
          job_type: string
          location: string
          qualifications: string
          responsibilities: string
          salary: string
          status: string
          title: string
          updated_at: string
          verified: boolean
        }
        Insert: {
          benefits?: string
          created_at?: string
          deadline?: string | null
          eligibility?: string
          employer: string
          hours?: string
          id?: string
          job_type?: string
          location: string
          qualifications?: string
          responsibilities?: string
          salary?: string
          status?: string
          title: string
          updated_at?: string
          verified?: boolean
        }
        Update: {
          benefits?: string
          created_at?: string
          deadline?: string | null
          eligibility?: string
          employer?: string
          hours?: string
          id?: string
          job_type?: string
          location?: string
          qualifications?: string
          responsibilities?: string
          salary?: string
          status?: string
          title?: string
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin"],
    },
  },
} as const
