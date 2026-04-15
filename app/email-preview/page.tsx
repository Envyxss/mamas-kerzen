import { newsletterEmailHtml } from '../api/email-template'

export default function EmailPreview() {
  return (
    <div dangerouslySetInnerHTML={{ __html: newsletterEmailHtml('MAMA10') }} />
  )
}
