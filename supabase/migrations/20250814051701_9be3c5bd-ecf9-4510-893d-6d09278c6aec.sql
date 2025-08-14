-- Update the farmers table SELECT policy to protect contact information from public access
-- Drop the overly permissive policy that allows anyone to view all farmers
DROP POLICY IF EXISTS "Admins can view all farmers" ON public.farmers;

-- Create a more secure policy that only allows authenticated users to view farmers
-- This prevents anonymous users from harvesting farmer email addresses and phone numbers
CREATE POLICY "Authenticated users can view farmers" 
ON public.farmers 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Keep the existing admin policies for insert, update, and delete operations
-- (These are already properly restricted to admins only)