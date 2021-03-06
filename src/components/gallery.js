/**
 * category gallery in homepage which points to each category
 * 
 * @2019/01/31, first create
 * @2019/03/04, use new index.md data from each category
 */
import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import { reorderforCateHead } from '../utils/helper'

import styles from '../style/gallery.module.css'


// process image style enable it to be responsive to the mouse over
// @2019/03/20
const lazyQueryGallery = () => {
  setTimeout(()=>{
    const icg = document.querySelector(".interact-cate-gallery")
    if(!icg) return
    
    const pictures = icg.querySelectorAll("picture img")
    pictures.forEach(img => img.style.removeProperty("opacity"))

  }, 600)// remove opacity style after initial css transition
}

const CategoryCard = ({cover, url, isMain, title, type}) => (
  <Link to={url} className={styles.darkenLink} 
    style={{height: isMain?"328px":"150px", overflow: "hidden"}}
    >
    <Image fluid={cover.childImageSharp.fluid} style={{height: "100%"}}/>
    <h4 className={isMain?styles.mainCategoryTitle:styles.subCategoryTitle}>{title}</h4>
  </Link>
)

const Gallery = ({data}) => {
  // check existence in build mode @2019/04/24
  if(typeof document !== 'undefined') lazyQueryGallery()
  
  const ctgs = reorderforCateHead(data.edges)
  // FIXME: @2019/03/04
  // 1. USE loop to declare ui; 
  // 2. extend to none fixed size category card;
  return (
      <div className={styles.gallery+' interact-cate-gallery'}>
        {/** 1st column is main card */}
        <div className={styles.cateColumn}>
          {ctgs[0] && 
              <CategoryCard 
                isMain={true} 
                url={ctgs[0].node.fields.slug} 
                cover={ctgs[0].node.frontmatter.cover}
                title={ctgs[0].node.frontmatter.category}/>
          }
        </div>
        {/** 2st column */}
        <div className={styles.cateColumn}>
          <div className={styles.cateColumnRowTop}>
            {ctgs[1] && 
                <CategoryCard 
                  isMain={false} 
                  url={ctgs[1].node.fields.slug}
                  cover={ctgs[1].node.frontmatter.cover}
                  title={ctgs[1].node.frontmatter.category} />
            }
          </div>
          <div className={styles.cateColumnRow}>
            {ctgs[2] &&
                <CategoryCard 
                  isMain={false} 
                  url={ctgs[2].node.fields.slug}
                  cover={ctgs[2].node.frontmatter.cover}
                  title={ctgs[2].node.frontmatter.category} />
            }
          </div>
        </div>
        {/** 3rd column*/}
        <div className={styles.cateColumn}>
          <div className={styles.cateColumnRowTop}>
            {ctgs[3] &&
                <CategoryCard 
                  isMain={false} 
                  url={ctgs[3].node.fields.slug}
                  cover={ctgs[3].node.frontmatter.cover}
                  title={ctgs[3].node.frontmatter.category} />
            }
          </div>
          <div className={styles.cateColumnRow}>
            {ctgs[4] &&
                <CategoryCard 
                  isMain={false} 
                  url={ctgs[4].node.fields.slug}
                  cover={ctgs[4].node.frontmatter.cover}
                  title={ctgs[4].node.frontmatter.category} />
            }
          </div>
        </div>
      </div>
  )
}

export default Gallery

