import cheerio from "cheerio"
import fs from "fs"
import { promisify } from "util"

const readUTFFile = async (path: string) => promisify(fs.readFile)(path, "utf8")

export interface SPAPageCreateOptions<TPageState> {
  /**
   * The path to the index.html page to parse.
   */
  indexHtmlPath: string
  /**
   * The initial state value for the page.
   */
  initialState: TPageState
  /**
   * Optimize the page by inserting all tags required for rendering immediately when loading the html.
   */
  autoPrepare?: boolean
}

interface SPAPageOptions<TPageState> {
  page: ReturnType<typeof cheerio["load"]>
  initialState: TPageState
}

export class SPAPage<TPageState> {
  private _isPrepared = false
  public get isPrepared() {
    return this._isPrepared
  }
  private _$state?: any

  public page: SPAPageOptions<TPageState>["page"]
  public state: TPageState

  private constructor({ page, initialState }: SPAPageOptions<TPageState>) {
    this.page = page
    this.state = initialState
  }

  /**
   * Ensure all necessary tags are present on the page.
   */
  public prepare() {
    if (this._isPrepared) return
    this._isPrepared = true

    this.page("head").append(`<script id="appstate"></script>`)
    this._$state = this.page("#appstate")
  }

  public render() {
    if (!this._isPrepared) throw new Error("Page must be prepared before render.")
    this._$state.html(`window.appState = ${JSON.stringify(this.state)}`)
    return this.page.html()
  }

  public static async create<TPageState>({
    indexHtmlPath,
    initialState,
    autoPrepare = false
  }: SPAPageCreateOptions<TPageState>) {
    const pageHtml = await readUTFFile(indexHtmlPath)
    const page = cheerio.load(pageHtml)
    const spaPage = new SPAPage<TPageState>({ page, initialState })
    if (autoPrepare) {
      spaPage.prepare()
    }
    return spaPage
  }
}
