import React from "react";

export const metaData ={
    title:'AAA',
    description:'aaaaa'
}
export default function RootLayout({childern}){
    return(
        <div>
            {childern}
        </div>
    )
}