export function render(movies, user) {
    return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Filmratingliste</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
Angemeldet als: ${user.firstname} ${
    user.lastname
  } &nbsp;&nbsp;<a href="/logout" class="button">abmelden</a>
  <table>
    <thead><tr><th>FilmID</th><th>Filmtitel</th><th>Erscheinungsjahr</th><th>Rating</th><th>Bearbeiten</th><th>Löschen</th></tr></thead>
    <tbody>
      ${movies
        .map(
          (movie) => `
        <tr>
          <td>${movie.id}</td>
          <td>${movie.title}</td>
          <td>${movie.year}</td>
          <td>
            <a href="/movie/rating/1/${movie.id}"' ${movie.rating >= 1 ? 'style="color: gold;"' : ''}>&#9734;</a>
            <a href="/movie/rating/2/${movie.id}"' ${movie.rating >= 2 ? 'style="color: gold;"' : ''}>&#9734;</a>
            <a href="/movie/rating/3/${movie.id}"' ${movie.rating >= 3 ? 'style="color: gold;"' : ''}>&#9734;</a>
            <a href="/movie/rating/4/${movie.id}"' ${movie.rating >= 4 ? 'style="color: gold;"' : ''}>&#9734;</a>
            <a href="/movie/rating/5/${movie.id}"' ${movie.rating >= 5 ? 'style="color: gold;"' : ''}>&#9734;</a>
            ${movie.allRatings ? Number(movie.allRatings).toFixed(1) : 0.0}
          </td>
          <td width="150"><a href="/movie/form/${movie.id}" class="button">bearbeiten</a></td>
          <td width="150"><a href="/movie/delete/${movie.id}" class="button">löschen</a></td>
           
        </tr>`
        )
        .join('')}
    </tbody>
  </table>
  <a href="/movie/form" class="button">neu</a>
</body>
</html>
  `;
}