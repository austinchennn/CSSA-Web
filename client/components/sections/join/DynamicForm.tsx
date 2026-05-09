"use client";

import { useState } from "react";
import type { ActiveEvent, FormFieldRaw } from "@/lib/types/cms.types";
import type { FormValues, FormErrors } from "@/lib/types/form.types";
import { submitRegistration } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface DynamicFormProps {
  event: ActiveEvent;
  onSuccess?: () => void;
}

export default function DynamicForm({ event, onSuccess }: DynamicFormProps) {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const schema: FormFieldRaw[] = event.form_schema || [];

  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    for (const field of schema) {
      const value = formValues[field.field];
      if (field.required && (!value || String(value).trim() === "")) {
        newErrors[field.field] = `${field.label}为必填项`;
      }
      // Email validation
      if (
        field.type === "email" &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))
      ) {
        newErrors[field.field] = "请输入有效的邮箱地址";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitMessage(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await submitRegistration(event.id, formValues);

      if (result.success) {
        setSubmitMessage({
          type: "success",
          text: "🎉 报名成功！感谢您的参与。",
        });
        setFormValues({});
        setErrors({});
        onSuccess?.();
      } else {
        setSubmitMessage({
          type: "error",
          text: result.error || "提交失败，请稍后重试。",
        });
      }
    } catch {
      setSubmitMessage({
        type: "error",
        text: "网络连接失败，请检查网络后重试。",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleFieldChange(field: string, value: string) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {event.title}
        </h3>
        {event.description && (
          <p className="text-sm text-muted-foreground mb-6">
            {event.description}
          </p>
        )}

        <div className="space-y-4">
          {schema.map((field) => (
            <div key={field.field}>
              <label
                htmlFor={`field-${field.field}`}
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                {field.label}
                {field.required && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </label>

              {field.type === "select" && field.options ? (
                <Select
                  id={`field-${field.field}`}
                  options={field.options.map((opt) => ({
                    value: opt,
                    label: opt,
                  }))}
                  placeholder={field.placeholder || `请选择${field.label}`}
                  value={String(formValues[field.field] || "")}
                  onChange={(e) =>
                    handleFieldChange(field.field, e.target.value)
                  }
                />
              ) : field.type === "textarea" ? (
                <textarea
                  id={`field-${field.field}`}
                  rows={4}
                  placeholder={field.placeholder || `请输入${field.label}`}
                  value={String(formValues[field.field] || "")}
                  onChange={(e) =>
                    handleFieldChange(field.field, e.target.value)
                  }
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              ) : (
                <Input
                  id={`field-${field.field}`}
                  type={field.type || "text"}
                  placeholder={field.placeholder || `请输入${field.label}`}
                  value={String(formValues[field.field] || "")}
                  onChange={(e) =>
                    handleFieldChange(field.field, e.target.value)
                  }
                />
              )}

              {/* Error message */}
              {errors[field.field] && (
                <p className="mt-1 text-sm text-destructive">
                  {errors[field.field]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Capacity info */}
        {event.capacity && (
          <p className="mt-4 text-sm text-muted-foreground">
            活动容量: {event.registrationCount ?? 0}/{event.capacity}
          </p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        提交报名
      </Button>

      {/* Submit message */}
      {submitMessage && (
        <div
          className={`mt-4 rounded-lg p-4 text-sm ${
            submitMessage.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {submitMessage.text}
        </div>
      )}
    </form>
  );
}
