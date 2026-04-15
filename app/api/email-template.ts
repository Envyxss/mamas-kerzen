export function newsletterEmailHtml(code: string = 'MAMA10') {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Willkommen bei Mamas Kerzen</title>
<link href="https://fonts.googleapis.com/css2?family=Vollkorn:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@400;500;600&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background:#f5ede3;font-family:'Jost',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5ede3;padding:40px 16px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">

        <!-- Header -->
        <tr><td align="center" style="padding-bottom:28px;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:10px;">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9" y="8" width="10" height="14" rx="2" stroke="#9b4422" stroke-width="1.5"/>
                  <path d="M9 22h10M12 26h4" stroke="#9b4422" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M14 8V5" stroke="#9b4422" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M12 5.5C12.5 4 14 3 14 5" stroke="#9b4422" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
              </td>
              <td style="font-family:'Vollkorn',Georgia,serif;font-size:18px;font-weight:600;color:#2c1a10;letter-spacing:0.02em;">
                Mamas Kerzen
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Main card -->
        <tr><td style="background:#fffdf9;border-radius:24px;overflow:hidden;box-shadow:0 2px 32px rgba(44,26,16,0.08);">

          <!-- Hero image area -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background:linear-gradient(135deg,#f0d9c8 0%,#e8c9b0 40%,#d4a882 100%);padding:48px 40px;text-align:center;">
              <div style="display:inline-block;">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="22" y="18" width="20" height="32" rx="4" fill="#c4734a" opacity="0.25"/>
                  <rect x="22" y="18" width="20" height="32" rx="4" stroke="#9b4422" stroke-width="1.8"/>
                  <path d="M22 50h20M27 58h10" stroke="#9b4422" stroke-width="1.8" stroke-linecap="round"/>
                  <path d="M32 18V12" stroke="#9b4422" stroke-width="1.8" stroke-linecap="round"/>
                  <path d="M28.5 13C29.5 10 32 8.5 32 13" stroke="#9b4422" stroke-width="1.5" stroke-linecap="round"/>
                  <ellipse cx="32" cy="13" rx="3" ry="4" fill="#f4a636" opacity="0.9"/>
                  <ellipse cx="32" cy="13" rx="1.5" ry="2.5" fill="#ffd166"/>
                </svg>
              </div>
              <p style="margin:16px 0 0;font-family:'Vollkorn',Georgia,serif;font-style:italic;font-size:13px;color:#9b4422;letter-spacing:0.12em;text-transform:uppercase;">
                Handgemacht mit Liebe
              </p>
            </td></tr>
          </table>

          <!-- Content -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:40px 44px 0;">
              <h1 style="margin:0 0 12px;font-family:'Vollkorn',Georgia,serif;font-size:28px;font-weight:700;color:#2c1a10;line-height:1.2;">
                Willkommen in der Familie! 🕯️
              </h1>
              <p style="margin:0 0 20px;font-family:'Jost',Arial,sans-serif;font-size:15px;color:#7a6558;line-height:1.7;">
                Schön, dass du dabei bist. Bei Mamas Kerzen entstehen jede Kerze mit Sorgfalt und Liebe — aus natürlichem Wachs, hochwertigen Düften und viel Herzblut.
              </p>
              <p style="margin:0;font-family:'Jost',Arial,sans-serif;font-size:15px;color:#7a6558;line-height:1.7;">
                Als kleines Dankeschön für deine Anmeldung bekommst du einen exklusiven Rabatt auf deine erste Bestellung:
              </p>
            </td></tr>

            <!-- Discount code box -->
            <tr><td style="padding:28px 44px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#fdf0e8,#f5e0cc);border-radius:16px;border:1.5px dashed #c4734a;">
                <tr><td style="padding:28px;text-align:center;">
                  <p style="margin:0 0 6px;font-family:'Jost',Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#9b4422;">
                    Dein persönlicher Rabattcode
                  </p>
                  <p style="margin:0 0 8px;font-family:'Vollkorn',Georgia,serif;font-size:36px;font-weight:700;color:#7a2e0e;letter-spacing:0.08em;">
                    ${code}
                  </p>
                  <p style="margin:0;font-family:'Jost',Arial,sans-serif;font-size:13px;color:#9b6040;">
                    10% Rabatt · Nur für deine erste Bestellung
                  </p>
                </td></tr>
              </table>
            </td></tr>

            <!-- Features row -->
            <tr><td style="padding:0 44px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  ${[
                    { icon: '🌿', label: 'Natürliches Wachs' },
                    { icon: '🤲', label: 'Handgemacht' },
                    { icon: '✉️', label: 'Liefer&shy;ung zu dir' },
                  ].map(f => `
                  <td width="33%" style="text-align:center;padding:0 6px;">
                    <div style="background:#f5ede3;border-radius:12px;padding:14px 8px;">
                      <div style="font-size:20px;margin-bottom:6px;">${f.icon}</div>
                      <p style="margin:0;font-family:'Jost',Arial,sans-serif;font-size:11px;color:#7a6558;line-height:1.4;">${f.label}</p>
                    </div>
                  </td>`).join('')}
                </tr>
              </table>
            </td></tr>

            <!-- CTA button -->
            <tr><td style="padding:0 44px 40px;text-align:center;">
              <a href="https://mamas-kerzen.de/de/shop"
                style="display:inline-block;background:#9b4422;color:#ffffff;font-family:'Jost',Arial,sans-serif;font-size:14px;font-weight:600;letter-spacing:0.04em;text-decoration:none;padding:14px 36px;border-radius:50px;">
                Jetzt Kollektion entdecken →
              </a>
              <p style="margin:16px 0 0;font-family:'Jost',Arial,sans-serif;font-size:12px;color:#b09880;">
                Code beim Checkout eingeben
              </p>
            </td></tr>
          </table>

          <!-- Divider -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="height:1px;background:#ede2d4;"></td></tr>
          </table>

          <!-- Footer of card -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:24px 44px;text-align:center;">
              <p style="margin:0;font-family:'Jost',Arial,sans-serif;font-size:12px;color:#b09880;line-height:1.6;">
                Du erhältst diese E-Mail, weil du dich auf <strong style="color:#9b6040;">mamas-kerzen.de</strong> angemeldet hast.<br/>
                Bei Fragen antworte einfach auf diese E-Mail.
              </p>
            </td></tr>
          </table>

        </td></tr>

        <!-- Outer footer -->
        <tr><td style="padding:24px 0;text-align:center;">
          <p style="margin:0;font-family:'Jost',Arial,sans-serif;font-size:11px;color:#b09880;">
            © 2025 Mamas Kerzen · Aachen, Deutschland
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function contactEmailHtml(name: string, email: string, message: string) {
  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"/><title>Neue Nachricht</title></head>
<body style="margin:0;padding:0;background:#f5ede3;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5ede3;padding:40px 16px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#fffdf9;border-radius:20px;overflow:hidden;box-shadow:0 2px 24px rgba(44,26,16,0.08);">
        <tr><td style="background:linear-gradient(135deg,#f0d9c8,#d4a882);padding:28px 40px;">
          <p style="margin:0;font-family:Georgia,serif;font-size:18px;font-weight:700;color:#2c1a10;">Mamas Kerzen</p>
          <p style="margin:4px 0 0;font-size:13px;color:#7a4e2e;">Neue Kontaktanfrage</p>
        </td></tr>
        <tr><td style="padding:32px 40px;">
          <p style="margin:0 0 20px;font-size:14px;color:#7a6558;">Du hast eine neue Nachricht erhalten:</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf5ef;border-radius:12px;border-left:3px solid #9b4422;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#9b4422;text-transform:uppercase;letter-spacing:0.1em;">Von</p>
              <p style="margin:0 0 4px;font-size:15px;font-weight:600;color:#2c1a10;">${name}</p>
              <p style="margin:0;font-size:13px;color:#9b6040;">${email}</p>
            </td></tr>
          </table>
          <p style="margin:20px 0 8px;font-size:12px;font-weight:600;color:#9b4422;text-transform:uppercase;letter-spacing:0.1em;">Nachricht</p>
          <p style="margin:0;font-size:15px;color:#2c1a10;line-height:1.7;white-space:pre-wrap;">${message}</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
            <tr><td>
              <a href="mailto:${email}" style="display:inline-block;background:#9b4422;color:#fff;font-size:13px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:50px;">
                Antworten →
              </a>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
