webpackJsonp([2],{105:function(t,e,i){i(139);var a=i(1)(i(121),i(154),null,null);t.exports=a.exports},108:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["e","mode"]}},109:function(t,e,i){e=t.exports=i(100)(),e.push([t.i,".topic-item{border-bottom:1px solid #e2e2e2;height:50px;line-height:50px}.topic-item:hover{background-color:rgba(0,0,0,.05)}.topic-item .avatar{width:35px;height:35px}.topic-item .at-top,.topic-item .category{padding:2px 5px;color:#fff;background-color:#80bd01;border-radius:4px;line-height:20px;margin-right:5px;min-width:35px;text-align:center}.topic-item .category{font-size:.8em}.topic-item .title{min-width:66%}.topic-item a:hover{text-decoration:underline}.topic-item a:visited{color:#778087}.topic-item .count{font-size:.8em;width:60px;text-align:center}.topic-item .count .rc{color:#007aff;font-size:.8em}.topic-item .count .pv{font-size:.7em;color:#abadbb}.topic-item .last-reply{color:#778087;font-size:.7em}",""])},110:function(t,e,i){var a=i(109);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(101)("7b60c632",a,!0)},111:function(t,e,i){i(110);var a=i(1)(i(108),i(112),null,null);t.exports=a.exports},112:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"topic-item flex align_center trans_200 pad-lr-10"},["user_topics"!==t.mode?i("router-link",{attrs:{to:"/user/"+t.e.authorInfo.username}},[i("div",{staticClass:"avatar"},[i("img",{attrs:{width:"35",src:t.e.authorInfo.avatar}})])]):t._e(),i("span",{staticClass:"count"},[i("em",{staticClass:"rc"},[t._v(t._s(t.e.replyCount))]),t._v(" /\n    "),i("span",{staticClass:"pv"},[t._v(t._s(t.e.visitCount))])]),t.mode&&t.mode.indexOf("user_")!==-1?t._e():i("span",[t.e.top?i("span",{staticClass:"at-top"},[t._v("TOP")]):i("span",{staticClass:"category"},[t._v(t._s(t.e.categoryInfo.name))])]),i("span",{staticClass:"title ellipsis flex_1"},[i("router-link",{attrs:{to:"/topic/"+t.e.path}},[t._v(t._s(t.e.title))])],1),t.mode&&t.mode.indexOf("user_")!==-1?t._e():i("div",{staticClass:"last-reply self_end"},[i("b",[t._v(t._s(t._f("std2timeAgo")(t.e.lastReplyAt)))]),t._v(" ago\n  ")])],1)},staticRenderFns:[]}},121:function(t,e,i){"use strict";function a(t){var e=(t.state.route.params.path,parseInt(t.state.route.query.page)||1),i=30*(e-1),a=JSON.stringify({top:-1,_id:-1});return Promise.all([t.dispatch("fetch_categories"),t.dispatch("fetch_topics",{skip:i,sort:a}),t.dispatch("fetch_topics",{skip:i+30,sort:a,count:!0})])}Object.defineProperty(e,"__esModule",{value:!0});var o=i(4),s=(i.n(o),i(111)),r=i.n(s),c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t};e.default={components:{TopicItem:r.a},metaInfo:function(){return{title:"topic list"}},data:function(){return{curr_category:null}},watch:{curr_category:function(){var t=void 0;this.curr_category&&(t={category:this.curr_category._id}),this.$store.dispatch("fetch_topics",t?{criteria:t}:{sort:JSON.stringify({top:-1,_id:-1})})}},preFetch:a,computed:c({page:function(){return this.$route.query.page}},i.i(o.mapGetters)(["topic_list","category_list","topic_list_next"])),methods:{switchCategory:function(t){this.curr_category=t}},beforeMount:function(){this.$root._isMounted&&a(this.$store)}}},129:function(t,e,i){e=t.exports=i(100)(),e.push([t.i,".view-topics main{margin-right:305px}.view-topics main .tabs-category{color:#4cd964}.view-topics main .tabs-category .tab-category{display:inline-block;margin:6px 3px;padding:3px 12px;cursor:pointer}.view-topics main .tabs-category .tab-category:active,.view-topics main .tabs-category .tab-category:hover{background-color:#fff}.view-topics main .tabs-category .tab-category.active{background-color:#4cd964;color:#fff}.view-topics main .topic-list{min-height:800px}",""])},139:function(t,e,i){var a=i(129);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(101)("a711cdc4",a,!0)},154:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"view view-topics"},[i("div",{staticClass:"wide-screen row"},[i("main",{staticClass:"block main"},[i("header",{staticClass:"tabs-category pad-lr-10"},[i("div",{staticClass:"tab-category rad-4",class:{active:!t.curr_category},on:{click:function(e){t.switchCategory(null)}}},[t._v("All")]),t._l(t.category_list,function(e){return i("div",{staticClass:"tab-category rad-4",class:{active:t.curr_category===e},on:{click:function(i){t.switchCategory(e)}}},[t._v("\n\t\t\t\t\t"+t._s(e.name)+"\n\t\t\t\t")])})],2),i("div",{staticClass:"topic-list"},t._l(t.topic_list,function(t){return i("topic-item",{attrs:{e:t}})})),i("footer",{staticClass:"pager pad-lr-10"},[t.page>1?i("router-link",{attrs:{to:"/topic?page="+t.page--}},[i("span",{staticClass:"btn btn-tealBlue left"},[i("i",{staticClass:"fa fa-angle-double-left"}),t._v("\n\t\t\t\t\t"+t._s(t.prev.title))])]):t._e(),t.topic_list_next.length?i("router-link",{attrs:{to:"/topic?page="+t.page++}},[i("span",{staticClass:"btn btn-tealBlue right"},[t._v("\n\t\t\t\t\t"+t._s(t.next.title)+" ")]),i("i",{staticClass:"fa fa-angle-double-right"})]):t._e()],1)])])])},staticRenderFns:[]}}});