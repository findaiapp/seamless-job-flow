-- Insert sample jobs for testing the application flow
INSERT INTO public.jobs (id, title, company, location, description, pay_range, job_type, is_verified) VALUES
('00000000-0000-0000-0000-000000000001', 'Delivery Driver', 'Quick Delivery Co', 'Brooklyn, NY', 'Join our team of delivery drivers and earn competitive pay with flexible hours. No experience required - we provide training and support.', '$18-25/hr', 'full-time', true),
('00000000-0000-0000-0000-000000000002', 'Warehouse Associate', 'Storage Solutions', 'Queens, NY', 'Looking for reliable warehouse workers for day and night shifts. Great benefits and opportunity for advancement.', '$16-22/hr', 'full-time', true),
('1', 'Customer Service Representative', 'NYC Services Inc', 'Manhattan, NY', 'Provide excellent customer service via phone and email. Full training provided.', '$15-20/hr', 'part-time', true),
('2', 'Food Service Worker', 'Metro Deli', 'Bronx, NY', 'Join our kitchen team preparing fresh food daily. Flexible scheduling available.', '$14-18/hr', 'part-time', true)
ON CONFLICT (id) DO NOTHING;