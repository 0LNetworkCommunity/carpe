<script lang="ts">
  let htmlContent = "";
  // fetch(
  //   "https://raw.githubusercontent.com/OLSF/carpe/news-viewer/news/news.html"
  // )
  //   .then((response) => {
  //     console.dir(response);
  //     return response.text();
  //   })
  //   .then((html) => {
  //     htmlContent = html;
  //   });
</script>

<main>
  <h1>News:</h1>
  <p>{@html htmlContent}</p>
</main>
