export async function triggerWebhook(webhookUrl: string, data: any) {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Webhook failed with status ${response.status}`);
    }
    return { success: true };
  } catch (error) {
    console.error("Webhook error:", error);
    return { success: false };
  }
}
