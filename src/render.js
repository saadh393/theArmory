const path = require("path");
const fs = require("fs");
const { pathToFileURL } = require("url");

const directoryToScan = "C:\\Users\\ASUS\\Pictures\\SVG Collection\\";

const content = {
  data() {
    return {
      scanData: [],
      directoryToScan: directoryToScan,
    };
  },

  created() {
    this.scanDir();
  },

  methods: {
    scanDir() {
      let x = [];
      fs.readdir(
        directoryToScan,
        function (err, files) {
          files.forEach(function (file) {
            x.push(file);
          });
          this.scanData = [...x];
        }.bind(this)
      );
    },
  },
};

const app = Vue.createApp(content);

app.component("blog-post", {
  methods: {
    imageURL: function (img) {
      return directoryToScan + img;
    },
  },
  props: ["path"],
  template: `
      <div class="group bg-white rounded-lg shadow-sm overflow-hidden ring-1 ring-black ring-opacity-5">
        <div class="bg-gray-100 p-2 overflow-hidden">
          <div class="w-full h-full rounded-t-lg overflow-hidden">
            <img :src="imageURL(path)"  alt="" class="w-full max-h-32 object-scale-contain">
          </div>
        </div>
        <div class="py-3 px-4">
          <p class="text-sm font-medium text-gray-900 mb-1 text-center truncate "> {{path}} </p>
        </div>
      </div>
  `,
});

app.mount("#content");
