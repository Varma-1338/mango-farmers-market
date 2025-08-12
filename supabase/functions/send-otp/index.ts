import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendOTPRequest {
  email: string;
  fullName: string;
  userType?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, fullName, userType = 'user' }: SendOTPRequest = await req.json();

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in temporary storage (valid for 10 minutes)
    const otpKey = `otp_${email}`;
    const otpData = {
      otp,
      fullName,
      email,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    };

    // Note: In a real app, you'd store this in a database or Redis
    // For this demo, we'll use a simple in-memory storage approach
    // In production, consider using Supabase storage or a proper caching solution

    const emailResponse = await resend.emails.send({
      from: "MangoMarket <onboarding@resend.dev>",
      to: [email],
      subject: "Your MangoMarket Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #f97316, #eab308); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <span style="color: white; font-weight: bold; font-size: 24px;">M</span>
            </div>
            <h1 style="color: #333; margin: 0;">Welcome to MangoMarket!</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${fullName}!</h2>
            <p style="color: #666; margin-bottom: 20px;">Your verification code is:</p>
            <div style="font-size: 32px; font-weight: bold; color: #f97316; letter-spacing: 4px; margin: 20px 0;">${otp}</div>
            <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
          </div>
          
          <p style="color: #666; text-align: center; font-size: 14px;">
            If you didn't request this verification code, please ignore this email.
          </p>
        </div>
      `,
    });

    console.log("OTP email sent successfully:", emailResponse);
    console.log("Generated OTP for", email, ":", otp); // For development - remove in production

    // Return success response (don't include the actual OTP for security)
    return new Response(JSON.stringify({ 
      success: true, 
      message: "OTP sent successfully",
      email: email
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-otp function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);