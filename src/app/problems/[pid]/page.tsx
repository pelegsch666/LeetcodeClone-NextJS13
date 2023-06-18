'use client'
import Topbar from '@/app/components/Topbar/Topbar'
import Workspace from '@/app/components/Workspace/Workspace'
import React from 'react'

type ProblemPageProps = {}

const ProblemPage = (props: ProblemPageProps) => {
  return (
    <div>
      <Topbar problemPage/>
       <Workspace />
    </div>
  )
}

export default ProblemPage

// fetch the local data
// ssg - static site generation
// getStaticPaths => it create the dynamic routes
export async function getStaticPaths() {
  const paths = Object.keys()
}