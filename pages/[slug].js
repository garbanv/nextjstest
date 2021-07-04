import React from 'react'

export default function SinglePage({post}) {
    
const content = post.content
    return (
        <div>
            <h3 className="font-weight-bold">{post.title}</h3>

            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    )
}

export  async function getStaticPaths ( ){
/* call the api */
    const res = await fetch(`https://websiteserver-ds7cf.ondigitalocean.app/posts`)
    const posts = await res.json()
  
    /* we tell next how many paths we have */
   const paths = posts.map((post)=>({params:{slug:post.slug}}))

 return {
     paths,
     fallback:false
 }
}


export async function getStaticProps({params}){
    const res = await fetch(`https://websiteserver-ds7cf.ondigitalocean.app/posts?slug=${params.slug}`)
    const data = await res.json()
    const post= data[0]

    return {props:{post}}
}