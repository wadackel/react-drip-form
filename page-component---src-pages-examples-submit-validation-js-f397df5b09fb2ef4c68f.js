webpackJsonp([27],{'./node_modules/babel-loader/lib/index.js?{"presets":["/Users/tsuyoshiwada/develop/react-drip-form/www/node_modules/babel-preset-es2015/lib/index.js","/Users/tsuyoshiwada/develop/react-drip-form/www/node_modules/babel-preset-stage-1/lib/index.js","/Users/tsuyoshiwada/develop/react-drip-form/www/node_modules/babel-preset-react/lib/index.js","/Users/tsuyoshiwada/develop/react-drip-form/www/node_modules/babel-preset-es2015/lib/index.js","/Users/tsuyoshiwada/develop/react-drip-form/www/node_modules/babel-preset-stage-0/lib/index.js","/Users/tsuyoshiwada/develop/react-drip-form/www/node_modules/babel-preset-react/lib/index.js"],"plugins":["/Users/tsuyoshiwada/develop/react-drip-form/www/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","/Users/tsuyoshiwada/develop/react-drip-form/www/node_modules/babel-plugin-add-module-exports/lib/index.js","/Users/tsuyoshiwada/develop/react-drip-form/www/node_modules/styled-jsx/babel.js","/Users/tsuyoshiwada/develop/react-drip-form/www/node_modules/babel-plugin-add-module-exports/lib/index.js","/Users/tsuyoshiwada/develop/react-drip-form/www/node_modules/babel-plugin-add-module-exports/lib/index.js","/Users/tsuyoshiwada/develop/react-drip-form/www/node_modules/babel-plugin-transform-object-assign/lib/index.js"],"cacheDirectory":true}!./src/pages/examples/submit-validation.js':function(e,t,l){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function I(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a])}return e},s=function(){function e(e,t){for(var l=0;l<t.length;l++){var a=t[l];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,l,a){return l&&e(t.prototype,l),a&&e(t,a),t}}(),b=l("./node_modules/styled-jsx/style.js"),d=(a(b),l("./node_modules/styled-jsx/style.js")),n=a(d),u=l("./node_modules/react/react.js"),o=a(u),C=l("../src/index.js"),r=l("./src/components/index.js"),A=l("./src/fields/index.js"),m=function(e,t){return new Promise(function(l,a){setTimeout(function(){"example@mail.com"===e&&"passwd"===t?l():a()},1e3)})},p=(0,C.dripForm)()(function(e){var t=e.handlers,l=e.meta,a=l.invalid,g=l.pristine,I=e.submitting;return o.default.createElement("form",{onSubmit:t.onSubmit},o.default.createElement("div",null,o.default.createElement("label",{htmlFor:"email"},"Email-Address"),o.default.createElement(A.Input,{type:"email",id:"email",name:"email",label:"Email-Address",placeholder:"enter-your-email@example.com",validations:{required:!0,email:!0}})),o.default.createElement("div",null,o.default.createElement("label",{htmlFor:"email"},"Password"),o.default.createElement(A.Input,{type:"password",id:"password",name:"password",label:"Password",validations:{required:!0}})),o.default.createElement(r.Button,{onClick:t.onSubmit,disabled:a||g||I},I?"Logging in...":"Login"))}),G=function(e){function t(){var e,l,a,i;g(this,t);for(var c=arguments.length,s=Array(c),b=0;b<c;b++)s[b]=arguments[b];return l=a=I(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),a.state={submitting:!1},a.handleInitialize=function(e){a.form=e},a.handleSubmit=function(e){var t=e.email,l=e.password;a.setState({submitting:!0}),m(t,l).then(function(){a.setState({submitting:!1}),a.form.clear(),alert("Login succeeded!")}).catch(function(){a.form.setErrors({email:"Email-Address or password is incorrect."}),a.setState({submitting:!1})})},i=l,I(a,i)}return i(t,e),s(t,[{key:"render",value:function(){return o.default.createElement(p,c({},this.props,{submitting:this.state.submitting,onInitialize:this.handleInitialize,onValidSubmit:this.handleSubmit}))}}]),t}(u.Component),X=function(e){function t(){var e,l,a,i;g(this,t);for(var c=arguments.length,s=Array(c),b=0;b<c;b++)s[b]=arguments[b];return l=a=I(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),a.state={values:{}},i=l,I(a,i)}return i(t,e),s(t,[{key:"render",value:function(){var e=this,t=this.props.location,l=this.state.values;return o.default.createElement(r.Layout,{title:"Submit Validation",location:t},o.default.createElement(n.default,{styleId:4184726026,css:"form>div{margin-bottom:1em}form>div>label{display:block;margin:0 0 0.2em;font-weight:bold}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9wYWdlcy9leGFtcGxlcy9zdWJtaXQtdmFsaWRhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzSG9CLEFBRytCLEFBRUosZUFBOEIsSUFGZixjQUU2QyxrQkFBVyIsImZpbGUiOiJzcmMvcGFnZXMvZXhhbXBsZXMvc3VibWl0LXZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3RzdXlvc2hpd2FkYS9kZXZlbG9wL3JlYWN0LWRyaXAtZm9ybS93d3ciLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1hbGVydCAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvaHJlZi1uby1oYXNoICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9sYWJlbC1oYXMtZm9yICovXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZHJpcEZvcm0gfSBmcm9tICcuLi8uLi8uLi8uLi9zcmMvJztcbmltcG9ydCB7IExheW91dCwgQnV0dG9uLCBDb2RlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICcuLi8uLi9maWVsZHMvJztcblxuXG4vLyBTaW11bGF0ZSBBUElcbmNvbnN0IHJlcXVlc3RMb2dpbiA9IChlbWFpbCwgcGFzc3dvcmQpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKGVtYWlsID09PSAnZXhhbXBsZUBtYWlsLmNvbScgJiYgcGFzc3dvcmQgPT09ICdwYXNzd2QnKSB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlamVjdCgpO1xuICAgIH1cbiAgfSwgMTAwMCk7XG59KTtcblxuXG5jb25zdCBTdWJtaXRWYWxpZGF0aW9uRm9ybSA9IGRyaXBGb3JtKCkoKHtcbiAgaGFuZGxlcnMsXG4gIG1ldGE6IHsgaW52YWxpZCwgcHJpc3RpbmUgfSxcbiAgc3VibWl0dGluZyxcbn0pID0+IChcbiAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZXJzLm9uU3VibWl0fT5cbiAgICA8ZGl2PlxuICAgICAgPGxhYmVsIGh0bWxGb3I9XCJlbWFpbFwiPkVtYWlsLUFkZHJlc3M8L2xhYmVsPlxuICAgICAgPElucHV0XG4gICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgIGlkPVwiZW1haWxcIlxuICAgICAgICBuYW1lPVwiZW1haWxcIlxuICAgICAgICBsYWJlbD1cIkVtYWlsLUFkZHJlc3NcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cImVudGVyLXlvdXItZW1haWxAZXhhbXBsZS5jb21cIlxuICAgICAgICB2YWxpZGF0aW9ucz17e1xuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIGVtYWlsOiB0cnVlLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXY+XG4gICAgICA8bGFiZWwgaHRtbEZvcj1cImVtYWlsXCI+UGFzc3dvcmQ8L2xhYmVsPlxuICAgICAgPElucHV0XG4gICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgIGlkPVwicGFzc3dvcmRcIlxuICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICBsYWJlbD1cIlBhc3N3b3JkXCJcbiAgICAgICAgdmFsaWRhdGlvbnM9e3tcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG5cbiAgICA8QnV0dG9uXG4gICAgICBvbkNsaWNrPXtoYW5kbGVycy5vblN1Ym1pdH1cbiAgICAgIGRpc2FibGVkPXtpbnZhbGlkIHx8IHByaXN0aW5lIHx8IHN1Ym1pdHRpbmd9XG4gICAgPlxuICAgICAge3N1Ym1pdHRpbmcgPyAnTG9nZ2luZyBpbi4uLicgOiAnTG9naW4nfVxuICAgIDwvQnV0dG9uPlxuICA8L2Zvcm0+XG4pKTtcblxuXG5jbGFzcyBNeUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRlID0ge1xuICAgIHN1Ym1pdHRpbmc6IGZhbHNlLFxuICB9O1xuXG4gIGhhbmRsZUluaXRpYWxpemUgPSAoZm9ybSkgPT4ge1xuICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gIH07XG5cbiAgaGFuZGxlU3VibWl0ID0gKHsgZW1haWwsIHBhc3N3b3JkIH0pID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc3VibWl0dGluZzogdHJ1ZSB9KTtcblxuICAgIHJlcXVlc3RMb2dpbihlbWFpbCwgcGFzc3dvcmQpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzdWJtaXR0aW5nOiBmYWxzZSB9KTtcbiAgICAgICAgdGhpcy5mb3JtLmNsZWFyKCk7XG4gICAgICAgIGFsZXJ0KCdMb2dpbiBzdWNjZWVkZWQhJyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgdGhpcy5mb3JtLnNldEVycm9ycyh7IGVtYWlsOiAnRW1haWwtQWRkcmVzcyBvciBwYXNzd29yZCBpcyBpbmNvcnJlY3QuJyB9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHN1Ym1pdHRpbmc6IGZhbHNlIH0pO1xuICAgICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8U3VibWl0VmFsaWRhdGlvbkZvcm1cbiAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgIHN1Ym1pdHRpbmc9e3RoaXMuc3RhdGUuc3VibWl0dGluZ31cbiAgICAgICAgb25Jbml0aWFsaXplPXt0aGlzLmhhbmRsZUluaXRpYWxpemV9XG4gICAgICAgIG9uVmFsaWRTdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzaWNGb3JtRXhhbXBsZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRlID0ge1xuICAgIHZhbHVlczoge30sXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbG9jYXRpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyB2YWx1ZXMgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPExheW91dFxuICAgICAgICB0aXRsZT1cIlN1Ym1pdCBWYWxpZGF0aW9uXCJcbiAgICAgICAgbG9jYXRpb249e2xvY2F0aW9ufVxuICAgICAgPlxuICAgICAgICA8c3R5bGUganN4PntgXG4gICAgICAgICAgOmdsb2JhbChmb3JtID4gZGl2KSB7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxZW07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgOmdsb2JhbChmb3JtID4gZGl2ID4gbGFiZWwpIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgbWFyZ2luOiAwIDAgMC4yZW07XG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICB9XG4gICAgICAgIGB9PC9zdHlsZT5cblxuICAgICAgICA8cD5cbiAgICAgICAgICB0b2RvLi4uXG4gICAgICAgIDwvcD5cblxuICAgICAgICA8aHIgLz5cblxuICAgICAgICA8aDM+RXhhbXBsZTo8L2gzPlxuICAgICAgICA8TXlDb21wb25lbnRcbiAgICAgICAgICBvbkNoYW5nZT17diA9PiB0aGlzLnNldFN0YXRlKHsgdmFsdWVzOiB2IH0pfVxuICAgICAgICAvPlxuICAgICAgICA8aHIgLz5cblxuICAgICAgICA8aDM+VmFsdWVzOjwvaDM+XG4gICAgICAgIDxDb2RlIGxhbmd1YWdlPVwiamF2YXNjcmlwdFwiPntKU09OLnN0cmluZ2lmeSh2YWx1ZXMsIG51bGwsIDIpfTwvQ29kZT5cbiAgICAgICAgPGhyIC8+XG5cbiAgICAgICAgPGgzPlNhbXBsZSBDb2RlOjwvaDM+XG4gICAgICAgIDxDb2RlIGxhbmd1YWdlPVwiamF2YXNjcmlwdFwiPntgaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGRyaXBGb3JtIH0gZnJvbSAncmVhY3QtZHJpcC1mb3JtJztcbmB9PC9Db2RlPlxuICAgICAgPC9MYXlvdXQ+XG4gICAgKTtcbiAgfVxufVxuIl19 */\n/*@ sourceURL=src/pages/examples/submit-validation.js */"}),o.default.createElement("p",{"data-jsx":4184726026},"todo..."),o.default.createElement("hr",{"data-jsx":4184726026}),o.default.createElement("h3",{"data-jsx":4184726026},"Example:"),o.default.createElement(G,{onChange:function(t){return e.setState({values:t})}}),o.default.createElement("hr",{"data-jsx":4184726026}),o.default.createElement("h3",{"data-jsx":4184726026},"Values:"),o.default.createElement(r.Code,{language:"javascript"},JSON.stringify(l,null,2)),o.default.createElement("hr",{"data-jsx":4184726026}),o.default.createElement("h3",{"data-jsx":4184726026},"Sample Code:"),o.default.createElement(r.Code,{language:"javascript"},"import React, { Component } from 'react';\nimport { dripForm } from 'react-drip-form';\n"))}}]),t}(u.Component);t.default=X,e.exports=t.default}});
//# sourceMappingURL=page-component---src-pages-examples-submit-validation-js-f397df5b09fb2ef4c68f.js.map