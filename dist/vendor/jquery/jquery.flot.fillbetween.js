/*! grafana - v1.8.0 - 2014-09-08
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

!function(a){function b(a){function b(a,b){var c;for(c=0;c<b.length;++c)if(b[c].id===a.fillBetween)return b[c];return"number"==typeof a.fillBetween?a.fillBetween<0||a.fillBetween>=b.length?null:b[a.fillBetween]:null}function c(a,c,d){if(null!=c.fillBetween){var e=b(c,a.getData());if(e){for(var f,g,h,i,j,k,l,m,n=d.pointsize,o=d.points,p=e.datapoints.pointsize,q=e.datapoints.points,r=[],s=c.lines.show,t=n>2&&d.format[2].y,u=s&&c.lines.steps,v=!0,w=0,x=0;;){if(w>=o.length)break;if(l=r.length,null==o[w]){for(m=0;n>m;++m)r.push(o[w+m]);w+=n}else if(x>=q.length){if(!s)for(m=0;n>m;++m)r.push(o[w+m]);w+=n}else if(null==q[x]){for(m=0;n>m;++m)r.push(null);v=!0,x+=p}else{if(f=o[w],g=o[w+1],i=q[x],j=q[x+1],k=0,f===i){for(m=0;n>m;++m)r.push(o[w+m]);k=j,w+=n,x+=p}else if(f>i){if(s&&w>0&&null!=o[w-n]){for(h=g+(o[w-n+1]-g)*(i-f)/(o[w-n]-f),r.push(i),r.push(h),m=2;n>m;++m)r.push(o[w+m]);k=j}x+=p}else{if(v&&s){w+=n;continue}for(m=0;n>m;++m)r.push(o[w+m]);s&&x>0&&null!=q[x-p]&&(k=j+(q[x-p+1]-j)*(f-i)/(q[x-p]-i)),w+=n}v=!1,l!==r.length&&t&&(r[l+2]=k)}if(u&&l!==r.length&&l>0&&null!==r[l]&&r[l]!==r[l-n]&&r[l+1]!==r[l-n+1]){for(m=0;n>m;++m)r[l+n+m]=r[l+m];r[l+1]=r[l-n+1]}}d.points=r}}}a.hooks.processDatapoints.push(c)}var c={series:{fillBetween:null}};a.plot.plugins.push({init:b,options:c,name:"fillbetween",version:"1.0"})}(jQuery);