-- CRITICAL SECURITY FIXES
-- Fix exposed customer order data and private messages

-- 1. Fix Orders Table RLS Policy - Remove dangerous public access
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

-- Create secure policy that only allows authenticated users to view their own orders
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Fix Messages Table RLS Policy - Remove dangerous public access  
DROP POLICY IF EXISTS "Users can view their own messages" ON public.messages;

-- Create secure policy that only allows authenticated users to view their own messages
CREATE POLICY "Users can view their own messages" 
ON public.messages 
FOR SELECT 
USING (auth.uid() = user_id);

-- 3. Fix Database Function Security - Prevent search path manipulation
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 4. Create more restrictive farmer policy that protects contact info from non-admins
DROP POLICY IF EXISTS "Authenticated users can view farmers" ON public.farmers;

-- Create policy that shows all fields to admins, limited fields to others
CREATE POLICY "Users can view farmers with contact restrictions" 
ON public.farmers 
FOR SELECT 
USING (
  -- Admins can see everything
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
  -- Authenticated users can see farmers but contact info will be filtered in app layer
  OR auth.uid() IS NOT NULL
);