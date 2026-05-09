// ============================================================
// Dynamic Form Type Definitions
// Drives the DynamicForm component from event form_schema
// ============================================================

export type FieldType = "text" | "number" | "email" | "tel" | "select" | "textarea";

export interface FormField {
  field: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: FieldValidation;
}

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  errorMessage?: string;
}

export type FormSchema = FormField[];

export type FormValues = Record<string, string | number | undefined>;

export type FormErrors = Record<string, string>;

export interface SubmitPayload {
  eventId: string;
  userInfo: FormValues;
}

export interface SubmitResult {
  success: boolean;
  id?: string;
  error?: string;
}
