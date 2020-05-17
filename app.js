let vm = undefined

window.onload = async () => {
    const obj = JSON.parse(localStorage.getItem("sb"))
    if (obj) {
        vm = await StackBlitzSDK.embedProject("stackblitz-embedGithubProject", {
            ...obj,
            template: "create-react-app"
        }, { width: '100%', height: '100%' })
    } else {
        vm = await getInitialLectureSetup()
    }
}

async function save() {
    try {
        const files = await vm.getFsSnapshot()
        const dependencies = await vm.getDependencies()
        localStorage.setItem("sb", JSON.stringify({ files, dependencies }))
    } catch (e) {
        console.error(e)
    }
}

async function getInitialLectureSetup() {
   return await StackBlitzSDK.embedGithubProject("stackblitz-embedGithubProject", "fabianhinz/learnToCode/tree/stackblitz/dummy", { width: '100%', height: '100%' })
}