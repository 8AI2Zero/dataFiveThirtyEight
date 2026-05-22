# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the [FiveThirtyEight public data repository](https://github.com/fivethirtyeight/data) — a static archive of datasets and accompanying analysis code published alongside FiveThirtyEight articles. There is no build system, test suite, or application to run. The repository is a collection of ~168 independent dataset directories, not a software project.

As of June 2023, sports predictions and forecasts are no longer being updated.

## Repository Structure

```
/                         ← root
├── index.csv             ← master index: subfolder_name, dataset_url, article_url
├── README.md
├── .gitattributes        ← git LFS config for large files
└── <dataset-name>/       ← one directory per published dataset/article
    ├── README.md         ← data dictionary and article link (present in ~96% of dirs)
    └── *.csv / *.tsv / *.xlsx / *.R / *.py / *.sql / ...
```

**File types by count:** CSV (505), TSV (115), TXT (51), XLSX (15), R scripts (13), Python scripts (9), Jupyter notebooks (3), SQL (2).

## Dataset Directory Conventions

Each dataset directory is self-contained and independent. The standard structure is:

- **README.md** — links to the source article and contains the data dictionary as a Markdown table (`Header | Definition`). Some READMEs include a YAML frontmatter block (between `---` lines) that lists live data URLs from `projects.fivethirtyeight.com`.
- **Data files** — typically one or more CSVs. Some directories use TSV, XLSX, or TXT. A few contain raw source data alongside cleaned output files.
- **Analysis scripts** — where present, scripts (R, Python, SQL) show the analysis that produced the data. These are standalone and not part of any shared pipeline.

The 7 directories that lack a README are: `cabinet-turnover`, `classic-rock`, `college-majors`, `love-actually`, `nba-winprobs`, `sandy-311-calls`, `subreddit-algebra`.

## Git LFS

Two patterns use git LFS (configured in `.gitattributes`):
- `scrabble-games/scrabble_games.csv`
- All CSVs under `science-giving/`

## Adding a New Dataset

Follow the existing pattern:
1. Create a new subdirectory named with a kebab-case slug matching the article topic.
2. Add data files (CSV preferred).
3. Add a `README.md` with a link to the article and a `Header | Definition` table for each column.
4. Add an entry to `index.csv` with columns: `subfolder_name`, `dataset_url`, `article_url`.
5. Commit message convention: `Add data and README for <dataset-name>` (see git log).

## License

Data: [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/). Code: [MIT](https://opensource.org/licenses/MIT).
