@component('mail::message')

Hello {{ $user->name }},

You have requested a password reset. To reset your password, click the link below:

@component('mail::button', ['url' => 'http://localhost:3000/reset-password?token=' . $user->remember_token])
Reset Password
@endcomponent

If you didn't request this, you can safely ignore this email.

Thanks,
{{ config('app.name') }}
@endcomponent