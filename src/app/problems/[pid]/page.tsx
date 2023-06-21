
import Topbar from '@/app/components/Topbar/Topbar';
import Workspace from '@/app/components/Workspace/Workspace';
import { problems } from '@/app/utils/problems';
import React from 'react';




async function ProblemPage ({
  params: { pid },
}: {
  params: { pid: string }
}) {
 const problem = problems[pid];
  console.log(problem)
  return (
    <div>
      <Topbar problemPage />
      <Workspace />
    </div>
  );
};

export default ProblemPage;

// fetch the local data
// ssg - static site generation
// getStaticPaths => it create the dynamic routes
// export async function getStaticPaths() {
//   const paths = Object.keys(problems).map(key => ({
//     params: { pid: key },
//   }));

//   return {
//     paths,
   
//   };
// }

// export async function getStaticProps({params} : {params:{pid: string}}){
//   const {pid} = params;
//   const problem = problems[pid];
//   if(!problem){
//     return{
//       notFound: true
//     }
//   }  

//  return {
//   props: {
//     problem
//   }
//  }


// }