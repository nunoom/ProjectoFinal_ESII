import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to landing page
  redirect('/home');
}
