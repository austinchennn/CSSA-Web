// ============================================================
// Registration API — NestJS Microservice
// Submits registration data to the microservice, NOT to Strapi.
// ============================================================

import type { SubmitResult, FormValues } from "@/lib/types/form.types";

const MICROSERVICE_URL =
  process.env.NEXT_PUBLIC_MICROSERVICE_URL || "http://localhost:3002";

/**
 * Submit event registration to the NestJS microservice.
 *
 * POST ${MICROSERVICE_URL}/api/v1/registrations
 * Body: { eventId: string, userInfo: Record<string, string | number> }
 *
 * Error codes:
 * - 400: missing or invalid fields
 * - 409: event ended or capacity full
 * - 429: rate limited
 * - 503: backend temporarily unavailable
 */
export async function submitRegistration(
  eventId: string,
  userInfo: FormValues
): Promise<SubmitResult> {
  try {
    const res = await fetch(`${MICROSERVICE_URL}/api/v1/registrations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId, userInfo }),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, id: data.id };
    }

    // Handle specific error codes
    switch (res.status) {
      case 400:
        return {
          success: false,
          error: "提交信息不完整或格式有误，请检查后重新提交。",
        };
      case 409:
        return {
          success: false,
          error: "该活动已结束或名额已满，无法报名。",
        };
      case 429:
        return {
          success: false,
          error: "提交过于频繁，请稍后再试。",
        };
      case 503:
        return {
          success: false,
          error: "服务暂时不可用，请稍后再试。",
        };
      default: {
        const errorData = await res.json().catch(() => null);
        return {
          success: false,
          error:
            errorData?.message || `提交失败 (错误代码: ${res.status})`,
        };
      }
    }
  } catch (error) {
    console.error("Registration submission error:", error);
    return {
      success: false,
      error: "网络连接失败，请检查网络后重试。",
    };
  }
}
