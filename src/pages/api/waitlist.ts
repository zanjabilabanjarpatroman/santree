import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false; // This is a server endpoint

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { nama, email, whatsapp } = body;

    // Validate input
    if (!nama || !email || !whatsapp) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Semua field harus diisi!'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email tidak valid!'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Insert to Supabase using service role (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert([
        {
          nama,
          email,
          whatsapp,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);

      // Handle duplicate email
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Email sudah terdaftar!'
          }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Gagal menyimpan data. Coba lagi ya!'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data,
        message: 'Berhasil! Kamu udah masuk waitlist 🎉'
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Terjadi kesalahan. Coba lagi ya!'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
