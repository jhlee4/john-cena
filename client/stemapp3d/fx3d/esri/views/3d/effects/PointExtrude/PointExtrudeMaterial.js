/**
 * Copyright @ 2017 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["dojo/text!./PointExtrudeMaterial.xml","esri/core/declare","esri/views/3d/webgl-engine/lib/GLSLShader","../../webgl-engine-extensions/GLSLProgramExt","../../support/fx3dUtils"],function(e,i,t,r,s){var n=i(null,{declaredClass:"esri.views.3d.effects.PointExtrude.PointExtrudeMaterial",constructor:function(e){this._gl=e.gl,this._shaderSnippets=e.shaderSnippets,this._program=null,this._pushState=e.pushState,this._restoreState=e.restoreState,this._viewingMode=e.viewingMode},destroy:function(){this._program&&(this._program.dispose(),delete this._program,this._program=null)},_addDefines:function(e,i){var t="";if(null!=i)if(Array.isArray(i))for(var r=0,s=i.length;s>r;r++){var n=i[r];t+="#define "+n+"\n"}else for(var n in i)t+="#define "+n+"\n";return this._shaderSnippets.defines+"\n"+t+e},loadShaders:function(){if(this._shaderSnippets){(null==this._shaderSnippets.pointExtrudeVS||null==this._shaderSnippets.pointExtrudeFS)&&this._shaderSnippets._parse(e);var i=[];"global"==this._viewingMode?i.push("GLOBAL"):i.push("LOCAL");var s=this._addDefines(this._shaderSnippets.pointExtrudeVS,i),n=new t(35633,s,this._gl),a=new t(35632,this._shaderSnippets.pointExtrudeFS,this._gl);this._program=new r([n,a],this._gl)}return this._initResources()},_initResources:function(){return!0},bind:function(e,i){this._program.use(),this._program.uniformMatrix4fv("lp",e.proj),this._program.uniform4fv("le",e.viewport),this._program.uniform3fv("os",e.lightingData.direction),this._program.uniform4fv("ml",e.lightingData.ambient),this._program.uniform4fv("is",e.lightingData.diffuse),this._program.uniform4fv("sl",e.lightingData.specular),this._oldTex=this._gl.getParameter(32873);var t=i._activeTextureUnit;t>i.parameters.maxVertexTextureImageUnits-1-3&&(console.warn("Many textures are binded now, 3DFx lib may be work abnormally."),t=0),e.ss.bind(t+1),this._program.uniform1i("ss",t+1),e.ll.bind(t+2),this._program.uniform1i("ll",t+2),this._program.uniform2fv("ps",e.ps),this._program.uniform2f("ei",e.ei,e.ms),this._program.uniform3fv("ls",e.ls),this._gl.activeTexture(33984+t+3),this._gl.bindTexture(3553,e.pm),this._program.uniform1i("pm",t+3),this._program.uniform1f("me",e.me),this._program.uniform1f("lm",e.lm),this._program.uniform3fv("es",e.es),this._program.uniform1f("oi",e.time),this._program.uniform1i("el",e.reachedRepeatLimit),this._program.uniform1f("pp",e.pp),this._program.uniform1f("po",e.zoom),1!=i._depthTestEnabled&&(this._pushState(["setDepthTestEnabled",i._depthTestEnabled]),i.setDepthTestEnabled(!0)),1!=i._polygonCullingEnabled&&(this._pushState(["setFaceCullingEnabled",i._polygonCullingEnabled]),i.setFaceCullingEnabled(!0)),1029!=i._cullFace&&(this._pushState(["setCullFace",i._cullFace]),i.setCullFace(1029)),1!=i._blendEnabled&&(this._pushState(["setBlendingEnabled",i._blendEnabled]),i.setBlendingEnabled(!0))},bindVec3f:function(e,i,t,r){this._program.uniform3f(e,i,t,r)},bindVec3fv:function(e,i){this._program.uniform3fv(e,i)},bindMat4:function(e,i){this._program.uniformMatrix4fv(e,i)},release:function(e){this._gl.activeTexture(33984+e._activeTextureUnit+1),this._gl.bindTexture(3553,this._oldTex),this._restoreState(e),this._gl.useProgram(null)}});return n});