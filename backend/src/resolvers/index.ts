import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";


const resolversArray = loadFilesSync(path.join(__dirname, "."), {
    extensions: [".resolver.ts"],
    // if there are subfiles, recursive : true goes and fetch the files in there as well
    recursive: true
})

export default mergeResolvers(resolversArray)