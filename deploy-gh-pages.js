const ghPages = require("gh-pages");
const { exec } = require("child_process");

// Must be same as the repository name.
const githubRepository = "binary-tree-visualization";

const githubPagesDistDirectory = "./gh-pages-dist";

const build = (onSuccess) => {
  console.log("🛠 Building Application...");
  exec(
    `rm -rf ${githubPagesDistDirectory} && yarn parcel build --dist-dir ${githubPagesDistDirectory} --public-url /${githubRepository}`,
    (err) => {
      if (err) {
        console.log("🥹 Failed to build!");
        console.error(err);
      } else {
        console.log("🌟 Built successfully!");
        onSuccess();
      }
    }
  );
};

const deploy = () => {
  console.log("🌥 Deploying...");
  ghPages.publish(githubPagesDistDirectory, (err) => {
    if (err) {
      console.log("🥹 Failed to deploy!");
      console.error(err);
    } else {
      console.log("😄 Deployed successfully!");
    }
  });
};

build(() => deploy());
