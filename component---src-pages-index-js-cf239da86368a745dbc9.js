(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{186:function(t,e,a){"use strict";a.r(e),a.d(e,"pageQuery",function(){return u});var n=a(0),r=a.n(n),o=a(190),i=a(195),l=a(193),s=a(189),c=a(199);var m=function(t){var e,a;function n(){return t.apply(this,arguments)||this}return a=t,(e=n).prototype=Object.create(a.prototype),e.prototype.constructor=e,e.__proto__=a,n.prototype.render=function(){var t=this.props.data,e=t.site.siteMetadata.title,a=t.allMarkdownRemark.edges[0],n=a.node.frontmatter.title||a.node.fields.slug;return r.a.createElement(i.a,{location:this.props.location,title:e},r.a.createElement(l.a,{title:"Home"}),r.a.createElement("h1",{style:{textAlign:"center",marginBottom:"0"}},"Loris Cro"),r.a.createElement("small",{style:{textAlign:"center",display:"block"}},r.a.createElement("i",null,"Personal Website")),r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement("h4",{style:{marginTop:Object(s.a)(1),marginBottom:Object(s.a)(.25),color:"darkgrey",fontWeight:100}},r.a.createElement("small",null,"Latest Blog Post")),r.a.createElement("h3",{style:{margin:0,marginBottom:Object(s.a)(.2)}},r.a.createElement(o.a,{style:{boxShadow:"none"},to:a.node.fields.slug},n)),r.a.createElement("small",null,a.node.frontmatter.date)),r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement("h4",{style:{marginTop:Object(s.a)(1),marginBottom:Object(s.a)(.25),color:"darkgrey",fontWeight:100}},r.a.createElement("small",null,"Latest Talk")),r.a.createElement("h3",{style:{margin:0,marginBottom:Object(s.a)(.2)}},r.a.createElement("a",{style:{boxShadow:"none"},href:c.talks[0].url},c.talks[0].title)),r.a.createElement("small",null,c.talks[0].date," • ",c.talks[0].conf)),r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement("h4",{style:{marginTop:Object(s.a)(1),marginBottom:Object(s.a)(.25),color:"darkgrey",fontWeight:100}},r.a.createElement("small",null,"Latest Article")),r.a.createElement("h3",{style:{margin:0,marginBottom:Object(s.a)(.2)}},r.a.createElement("a",{style:{boxShadow:"none"},href:c.writings[0].url},c.writings[0].title)),r.a.createElement("small",null,c.writings[0].date," • ",c.writings[0].committent)))},n}(r.a.Component);e.default=m;var u="864086828"},189:function(t,e,a){"use strict";a.d(e,"a",function(){return s}),a.d(e,"b",function(){return c});var n=a(196),r=a.n(n),o=a(197),i=a.n(o);i.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"}}},delete i.a.googleFonts;var l=new r.a(i.a);var s=l.rhythm,c=l.scale},190:function(t,e,a){"use strict";var n=a(0),r=a.n(n),o=a(11),i=a.n(o),l=a(58),s=a.n(l);a.d(e,"a",function(){return s.a});a(191),r.a.createContext({});i.a.object,i.a.string.isRequired,i.a.func,i.a.func},191:function(t,e,a){var n;t.exports=(n=a(192))&&n.default||n},192:function(t,e,a){"use strict";a.r(e);a(17);var n=a(0),r=a.n(n),o=a(11),i=a.n(o),l=a(82),s=function(t){var e=t.location,a=t.pageResources;return a?r.a.createElement(l.a,Object.assign({location:e,pageResources:a},a.json)):null};s.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},e.default=s},193:function(t,e,a){"use strict";var n=a(194),r=a(0),o=a.n(r),i=a(11),l=a.n(i),s=a(198),c=a.n(s);function m(t){var e=t.description,a=t.lang,r=t.meta,i=t.title,l=n.data.site,s=e||l.siteMetadata.description;return o.a.createElement(c.a,{htmlAttributes:{lang:a},title:i,titleTemplate:"%s | "+l.siteMetadata.title,meta:[{name:"description",content:s},{property:"og:title",content:i},{property:"og:description",content:s},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:l.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:description",content:s}].concat(r)})}m.defaultProps={lang:"en",meta:[],description:""},m.propTypes={description:l.a.string,lang:l.a.string,meta:l.a.arrayOf(l.a.object),title:l.a.string.isRequired},e.a=m},194:function(t){t.exports={data:{site:{siteMetadata:{title:"Loris Cro's Personal Blog",description:"A blog about computer science and design.",author:"Loris Cro"}}}}},195:function(t,e,a){"use strict";var n=a(0),r=a.n(n),o=a(190),i=a(189),l=function(){return r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},r.a.createElement("title",null,"Twitter icon"),r.a.createElement("path",{d:"M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"}))},s=function(){return r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},r.a.createElement("title",null,"GitHub icon"),r.a.createElement("path",{d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"}))},c=(a(180),function(t){var e="/"===t.location.pathname?"navlink navlink-active":"navlink";return r.a.createElement("div",{style:{display:"flex",justifyContent:"space-evenly",marginBottom:Object(i.a)(2.5)}},r.a.createElement("a",{className:"navlink",target:"_blank",href:"https://twitter.com/croloris"},r.a.createElement(l,null)),r.a.createElement(o.a,{to:"/",className:e},"Home"),r.a.createElement(o.a,{to:"/blog",className:"navlink",activeClassName:"navlink-active",partiallyActive:!0},"Blog"),r.a.createElement(o.a,{to:"/more",className:"navlink",activeClassName:"navlink-active"},"More"),r.a.createElement("a",{className:"navlink",target:"_blank",href:"https://github.com/kristoff-it"},r.a.createElement(s,null)))});var m=function(t){var e,a;function n(){return t.apply(this,arguments)||this}return a=t,(e=n).prototype=Object.create(a.prototype),e.prototype.constructor=e,e.__proto__=a,n.prototype.render=function(){var t=this.props,e=t.location,a=(t.title,t.children);return r.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(i.a)(24),padding:Object(i.a)(1.5)+" "+Object(i.a)(.75)}},r.a.createElement("header",null,r.a.createElement(c,{location:e})),r.a.createElement("main",null,a),r.a.createElement("footer",{style:{textAlign:"center",marginTop:Object(i.a)(2)}},r.a.createElement("small",null,r.a.createElement("i",null,"© ",(new Date).getFullYear()," - Loris Cro"))))},n}(r.a.Component);e.a=m},199:function(t,e){e.talks=[{title:"Solving Tricky Coordination Problems In Stateless .NET Services",url:"https://www.youtube.com/watch?v=BO-SKMS-D_g",date:"June 22, 2019",conf:"NDC Oslo"},{title:"The Right Tool for the Right Job: Redis Modules & Zig",url:"https://www.youtube.com/watch?v=eCHM8-_poZY",date:"April 15, 2019",conf:"RedisDay Tel Aviv 2019"},{title:"Implementing a New Data Structure for Redis as an Inexperienced C Programmer",url:"https://www.youtube.com/watch?v=pmxaztRsoF4",date:"May 31, 2018",conf:"RedisConf 2018"}],e.writings=[{title:"5 Steps to Building a Great Redis Module",url:"https://redislabs.com/blog/5-steps-building-great-redis-module/",date:"July 22, 2019",committent:"Redis Labs - Tech Blog"},{title:"Introduction to RedisGears",url:"https://redislabs.com/blog/introduction-redis-gears/",date:"July 16, 2019",committent:"Redis Labs - Tech Blog"},{title:"Caches, Promises and Locks",url:"https://redislabs.com/blog/caches-promises-locks/",date:"May 29, 2019",committent:"Redis Labs - Tech Blog"},{title:"What to choose for your synchronous and asynchronous communication needs – Redis Streams, Redis Pub/Sub, Kafka etc.",url:"https://redislabs.com/blog/what-to-choose-for-your-synchronous-and-asynchronous-communication-needs-redis-streams-redis-pub-sub-kafka-etc-best-approaches-synchronous-asynchronous-communication/",date:"May 3, 2019",committent:"Redis Labs - Tech Blog"},{title:"Getting Started with Redis, Apache Spark and Python",url:"https://redislabs.com/blog/getting-started-redis-apache-spark-python/",date:"February 12, 2019",committent:"Redis Labs - Tech Blog"},{title:"How to Write a Redis Module in Zig",url:"https://redislabs.com/blog/write-redis-module-zig/",date:"January 23, 2019",committent:"Redis Labs - Tech Blog"},{title:"Redis: How Probabilistic Data Structures Support State-of-the-Art Apps",url:"https://thenewstack.io/redis-how-probabilistic-data-structures-support-state-of-the-art-apps/",date:"August 27, 2018",committent:"The New Stack"}]}}]);
//# sourceMappingURL=component---src-pages-index-js-cf239da86368a745dbc9.js.map