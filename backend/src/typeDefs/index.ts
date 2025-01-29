import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";


const typesArray = loadFilesSync(path.join(__dirname, "."), {
    extensions: ["gql"],
    // if there are subfiles, recursive : true goes and fetch the files in there as well
    recursive: true
})

export default mergeTypeDefs(typesArray)