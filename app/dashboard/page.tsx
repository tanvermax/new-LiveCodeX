import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardPage = async () => {
  const session = await auth();

  console.log(session);

  if (!session) {
    return redirect("/")
  }
  
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage