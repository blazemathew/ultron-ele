/**
 * @2019/02/02
 */
import React from 'react'

import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Gallery from '../components/gallery'
import Tutorials from '../components/tutorials'
// import {saveCategory} from '../utils/cache'

const IndexPage = ({data}) => { 

  const { catedocs, tutorials } = data
  
  // console.log(catedocs);
  // console.log(tutorials)
  // Need to cache something like category and its slug?
  // categories.frontmatter.categories.map(
  //   c => saveCategory(c.path, c.name, c.cover)
  // )
  let categories = []
  let tempCates = catedocs.edges
  tempCates.map((cat,i) => {// find the head
    if(cat.node.frontmatter.ishead) categories.push(cat)
  })
  tempCates.map((cat,i) => {// find the other
    if(!cat.node.frontmatter.ishead) categories.push(cat)
  })
  
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `elms`, `elearning`]} />
      
      <h3 style={{paddingTop: `1.45rem`}}>Topics and Skills</h3>
      {/** category galery */}
      <Gallery data={categories} />
      {/** latest tutorials */}
      <h3>Start your journey</h3>
      <Tutorials data={tutorials} />

    </Layout>
  )
}

export default IndexPage


export const IndexQuery = graphql`
  query IndexQuery {

    # this is obsolete @2019/02/20
    # categories: file(relativePath: { regex: "/index-gallery/" }) {
    #   childDataYaml {
    #     categories {
    #       name
    #       path
    #       cover
    #     }
    #   }
    # }

    # query all the index.md in each category @2019/03/03
    catedocs: allMarkdownRemark(
      filter: {
        fields: { slug: {regex: "/\/category\/[\\\\w-]+\/$/"} }
      },
      sort: { fields: [frontmatter___date], order: DESC }
    ){
      edges {
        node {
          fields {slug}
          frontmatter {
            category
            date
            cover {
              childImageSharp {
                fluid(maxWidth: 345) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            ishead
          }
        }
      }
    }

    # query content/category/categories.md @2019/02/22
    # categories: markdownRemark(fields: { slug: { eq: "/categories/" } }) {
    #   frontmatter {
    #     categories {
    #       cover {
    #         childImageSharp {
    #           fluid(maxWidth: 345){
    #             ...GatsbyImageSharpFluid
    #           }
    #         }
    #       }
    #       path
    #       name
    #     }
    #   }
    # }
    # query latest tutorials files
    tutorials: allMarkdownRemark(
      filter: {frontmatter: {title: {ne: ""}, tutorial: {ne: null}}},
      sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              cover {
                childImageSharp {
                  fluid(maxWidth: 250, maxHeight: 100){
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              tutorial
              title
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }


  }
`
