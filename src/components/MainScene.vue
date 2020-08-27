<template>
    <div class="in-body">

        <nav>
            <div class="nav-div">
                <h1 class="nav-text-logo">Proyecto Final Carretero-Covelli</h1>
                <img class="profile-img" src="../assets/avatar-photo.png" alt="Foto perfil usuario"/>
            </div>
        </nav>

        <div>
            <div class="vertical-splitter">
                <div class="div-l">
                    <div class="div-consigna-contract">
                        <h3 class="h3-consigna">Consigna</h3>
                        <img class="profile-img" src="../assets/expand-arrow.png" alt="Boton para expandir/contraier consigna"/>
                    </div>
                    <div class="div-editor-contract">
                        <editor v-model="editorContent" @init="editorInit" lang="typescript" theme="chrome" width="768" height="628"></editor>
                    </div>
                </div>

                <div class="div-r">
                    <div class="div-interactive-view div-centralizar-contenido">
                        <div>
                            <strong>Variables</strong>

                            <ul id="example-1">
                                <li v-for="variable in variables" :key="variable.name">
                                    {{ variable.name }} = {{ variable.value }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="div-contenedor-capsula">
                        <div class="div-play-pause-stop">
                            <img class="small-icon" src="../assets/pause-icon.png" alt="Boton Pause"/>
                            <img @click="onPlayClicked" class="medium-icon play-icon" src="../assets/play-icon.png" alt="Boton Play"/>
                            <img class="small-icon" src="../assets/stop-icon.png" alt="Boton Stop"/>
                        </div>
                    </div>

                <div class="div-test-base div-centralizar-contenido">
                <h4>
                    <strong>Vista Banco de Test</strong>
                </h4>
                <br />
                <p>
                    Donde se presetara una lista de distintos casos de ejemplo
                    especificos de la consigna, los cuales seran testeados al
                    momento de ejecutar la solucion propuesta por el usuario.
                </p>
                </div>
            </div>
            </div>
      </div>

    </div>
</template>

<script>

    //import * as ts from "typescript";
    import {Debugger} from '../debugger/debugger';
    import {db} from '../db/firebase';

    export default {
        name: 'MainScene',
        props: {
            msg: String
        },
        components: {
            editor: require('vue2-ace-editor'),
        },
        data: function() {
            return {
                editorContent: '',
                parsedNodes: [],
                debugger: undefined,
                variables: undefined
            };
        },
        methods: {

            editorInit: function() {

                require('brace/ext/language_tools') //language extension prerequsite...
                require('brace/mode/html')                
                require('brace/mode/javascript')
                require('brace/mode/typescript')    //language
                require('brace/mode/less')
                require('brace/theme/chrome')
                require('brace/snippets/typescript') 
                require('brace/snippets/javascript') //snippet
            },
    
            onPlayClicked: function() {

                // if (!this.debugger) {
                //     this.debugger = new Debugger(this.editorContent);
                // }
                // this.debugger.next();

                //ts.transpile(this.editorContent);

                this.debugger = new Debugger(this.editorContent);
                this.debugger.runAllCode();

                console.log(this.debugger.getVariables());

                this.variables = this.debugger.getVariables();

                const exercises = db.ref('exercises');

                exercises.once('value').then(function(snapshot) {
                    console.log(snapshot.val());
                });

                if (this.editorContent) {
                    db.ref('exercises').push({
                        typescript: this.editorContent,
                        javascript: 'javascript code'
                    });
                }

            }
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    body > #root > div {
        min-height: 100vh;
        background-color: var(--main-color);
    }

    /* CSS TestLayout */

    nav {
    background-color: #282c34;
    }

    .nav-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    }

    .nav-text-logo {
    font-size: 15px;
    color: white;
    padding: 10px 13px;
    text-align: left;
    margin: 0px;
    }

    .profile-img {
    margin: 5px 20px;
    height: 20px;
    width: 20px;
    }

    .in-body {
    background-color: var(--main-color);
    height: 100vh;
    }

    .vertical-splitter {
    --main-color: #242424;
    background-color: var(--main-color);
    min-height: calc(100vh - 37.6px);
    display: flex;
    }

    @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    .vertical-splitter {
        --main-color: #242424;
        background-color: var(--main-color);
        min-height: calc((100vh));
        height: auto;
        display: flex;
        flex-direction: column;
    }

    .div-l {
        background-color: var(--main-color);
        height: calc(100vh - 37.6px);
        width: 100vw;
        padding: 3px;
    }

    .div-r {
        background-color: var(--main-color);
        height: calc(100vh);
        width: 100vw;
        padding: 3px;
        position: relative;
    }
    }

    .div-l {
    background-color: var(--main-color);
    min-height: 100%;
    min-width: 50vw;
    padding: 3px;
    }

    .div-consigna-expanded {
    background-color: #ffffff;
    height: 20%;
    width: 100%;
    margin-bottom: 3px;
    display: flex;
    justify-content: space-between;
    }

    .div-consigna-contract {
    background-color: #ffffff;
    height: 5%;
    width: 100%;
    margin-bottom: 3px;
    display: flex;
    justify-content: space-between;
    }

    .h3-consigna {
    font-size: medium;
    text-align: left;
    padding: 10px;
    margin: 0px;
    }

    .profile-img {
    margin-top: 10px;
    height: 20px;
    width: 20px;
    }

    .div-editor-expanded {
    background-color: black;
    height: 95%;
    width: 100%;
    }

    .div-editor-contract {
    background-color: black;
    height: 80%;
    width: 100%;
    }

    .ace_content {
    height: 100%;
    }

    .div-r {
    background-color: var(--main-color);
    min-width: 40vw;
    padding: 3px;
    position: relative;
    }

    h4 {
    color: white;
    text-align: center;
    }

    p {
    color: white;
    text-align: center;
    }

    .div-interactive-view {
    background-color: #765ca1;
    height: 58%;
    }

    .div-centralizar-contenido {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    }

    .div-test-base {
    background-color: #009688;
    height: 40%;
    padding: 0px 80px;
    }

    .div-contenedor-capsula {
    position: absolute;
    top: 53%;
    left: auto;
    border: none;
    height: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: calc(100% - 18px);
    max-width: calc(100% - 18px);
    }

    .div-play-pause-stop {
    position: absolute;
    top: auto;
    left: auto;
    border: none;
    width: 150px;
    height: 35px;
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
    border-radius: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 2px;
    }

    .medium-icon {
    width: 32px;
    height: 32px;
    margin: 0px 6px;
    }

    img {
        opacity: 0.5;
    }

    img:hover {
        opacity: 1;
    }

    .small-icon {
    width: 26px;
    height: 26px;
    }

    #mynetwork {
    width: 600px;
    height: 400px;
    border: 1px solid lightgray;
    }

</style>