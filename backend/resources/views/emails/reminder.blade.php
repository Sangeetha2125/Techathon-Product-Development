@component('mail::message')
# Reminder: Post Your Memory to Maintain Your Streak

Hello {{ $user->name }},

We noticed that you have an ongoing streak of posting memories on our platform. To maintain your streak and keep the memories alive, it's important to post your memory today.

Don't let your streak slip away! Share a memory now by clicking the button below:

@component('mail::button', ['url' => 'http://localhost:3000/signin'])
Post a Memory
@endcomponent

If you have already posted your memory today, thank you for keeping your streak alive.

If you have any questions or need assistance, please feel free to contact us.

Thanks for being a part of {{ config('app.name') }} community!

Sincerely,
{{ config('app.name') }}
@endcomponent