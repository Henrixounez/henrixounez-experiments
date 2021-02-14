import { makeAutoObservable } from "mobx";

const EditorStore = makeAutoObservable({
  language: "javascript",
  setLanguage: (v: string) => EditorStore.language = v,

  connected: false,
  setConnected: (v: boolean) => EditorStore.connected = v,

  openLanguageTab: false,
  setOpenLanguageTab: (v: boolean) => EditorStore.openLanguageTab = v,

  scrollTop: 0,
  setScrollTop: (v: number) => EditorStore.scrollTop = v,

  myClient: {id: -1, name: ""},
  setMyClient: (v: any) => EditorStore.myClient = v,

  otherClients: [],
  setOtherClients: (v: any[]) => EditorStore.otherClients = v,

  totalLines: 0,
  text: "",
  setText: (v: string) => {
    EditorStore.text = v
    EditorStore.totalLines = (v.match(/\n/g) || []).length;
  },
})

export default EditorStore;