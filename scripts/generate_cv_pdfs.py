import json
import shutil
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public"
LOCALES = ("es", "en", "fr", "it")
FEATURED_PROJECTS = (
    "visitors",
    "trickreport",
    "chiguire",
    "souvenirs",
    "page-to-pdf",
    "maintenance-tracker",
)
CONTACT = "Aragua, Venezuela | +58-424-3737586 | gustavojose0819@gmail.com | github.com/Suggus1899"

LABELS = {
    "es": {"experience": "Experiencia", "education": "Educación", "certifications": "Cursos", "technologies": "Tecnologías", "projects": "Proyectos seleccionados", "project": "Proyecto", "description": "Descripción", "languages": "Idiomas", "private": "Privado"},
    "en": {"experience": "Experience", "education": "Education", "certifications": "Courses", "technologies": "Technologies", "projects": "Selected projects", "project": "Project", "description": "Description", "languages": "Languages", "private": "Private"},
    "fr": {"experience": "Expérience", "education": "Formation", "certifications": "Cours", "technologies": "Technologies", "projects": "Projets sélectionnés", "project": "Projet", "description": "Description", "languages": "Langues", "private": "Privé"},
    "it": {"experience": "Esperienza", "education": "Formazione", "certifications": "Corsi", "technologies": "Tecnologie", "projects": "Progetti selezionati", "project": "Progetto", "description": "Descrizione", "languages": "Lingue", "private": "Privato"},
}


def load_data():
    repos = json.loads((ROOT / "src/repos.json").read_text(encoding="utf-8"))
    messages = {
        locale: json.loads((ROOT / f"messages/{locale}.json").read_text(encoding="utf-8"))
        for locale in LOCALES
    }
    ids = {repo["id"] for repo in repos}
    assert len(repos) == 12 and sum(repo.get("isPrivate", False) for repo in repos) == 1
    for locale in LOCALES:
        assert set(messages[locale]["Projects"]["items"]) == ids
    return repos, messages


def styles():
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle("Name", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=18, leading=21, textColor=colors.HexColor("#111827")),
        "contact": ParagraphStyle("Contact", parent=base["Normal"], fontSize=8, leading=10, textColor=colors.HexColor("#4B5563")),
        "section": ParagraphStyle("Section", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=colors.HexColor("#111827"), spaceBefore=8, spaceAfter=4),
        "role": ParagraphStyle("Role", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=9.2, leading=11, textColor=colors.HexColor("#111827"), spaceBefore=4),
        "company": ParagraphStyle("Company", parent=base["Normal"], fontSize=8.1, leading=9.5, textColor=colors.HexColor("#4B5563")),
        "body": ParagraphStyle("Body", parent=base["Normal"], alignment=TA_LEFT, fontSize=8.5, leading=10.6, textColor=colors.HexColor("#1F2937")),
        "bullet": ParagraphStyle("Bullet", parent=base["Normal"], fontSize=8, leading=9.8, leftIndent=9, firstLineIndent=-7, textColor=colors.HexColor("#1F2937"), spaceAfter=1),
        "table": ParagraphStyle("Table", parent=base["Normal"], fontSize=7.3, leading=8.8, textColor=colors.HexColor("#1F2937")),
        "table_head": ParagraphStyle("TableHead", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=7.3, leading=8.8, textColor=colors.white),
    }


def para(text, style):
    markup = escape(str(text)).replace("\n", "<br/>")
    for tag in ("b", "br"):
        markup = markup.replace(f"&lt;{tag}&gt;", f"<{tag}>").replace(f"&lt;{tag}/&gt;", f"<{tag}/>")
        markup = markup.replace(f"&lt;/{tag}&gt;", f"</{tag}>")
    return Paragraph(markup, style)


def section(title, style):
    return Paragraph(escape(title), style["section"])


def header(style):
    return [Paragraph("Gustavo Colina", style["name"]), Spacer(1, 2), Paragraph(escape(CONTACT), style["contact"])]


def build_cv(locale, repos, message):
    language = LABELS[locale]
    curriculum = message["Curriculum"]
    experience = message["Experience"]
    education = message["Education"]
    project_content = message["Projects"]["items"]
    style = styles()
    output = OUTPUT_DIR / f"curriculum-{locale}.pdf"
    document = SimpleDocTemplate(str(output), pagesize=letter, leftMargin=0.45 * inch, rightMargin=0.45 * inch, topMargin=0.4 * inch, bottomMargin=0.4 * inch, title=f"Gustavo Colina — {message['Hero']['role']}", author="Gustavo Colina")

    story = header(style)
    story += [section(curriculum["pdfProfileTitle"], style), para(curriculum["summary"], style["body"]), section(curriculum["pdfExperienceTitle"], style)]
    for index in (3, 1, 2):
        role = experience[f"exp{index}Role"]
        company = experience[f"exp{index}Company"]
        period = experience[f"exp{index}Period"]
        story.append(para(f"{role} · {company} · {period}", style["role"]))
        story.append(para(experience[f"exp{index}Description"], style["body"]))
        for achievement in range(1, 4):
            story.append(para(f"• {experience[f'exp{index}Achievement{achievement}']}", style["bullet"]))
        story.append(para(f"<b>{language['technologies']}:</b> {experience[f'exp{index}Technologies']}", style["company"]))

    story.append(PageBreak())
    story += header(style)
    story.append(section(language["education"], style))
    story.append(para(f"<b>{education['universityTitle']}</b> · {education['universityEntity']}<br/>{education['universitySubtitle']}", style["body"]))
    story.append(section(language["certifications"], style))
    story.append(para(f"{education['certDataScienceTitle']} · {education['certDataScienceEntity']}<br/>{education['certJavaTitle']} · {education['certJavaEntity']}", style["body"]))
    story.append(section(curriculum["pdfSkillsTitle"], style))
    technologies = list(dict.fromkeys(tech for repo in repos for tech in repo["technologies"]))
    story.append(para(", ".join(technologies), style["body"]))
    skills = message["Skills"]
    story.append(section(language["languages"], style))
    story.append(para(", ".join(skills[key] for key in ("langSpanish", "langEnglish", "langFrench", "langItalian")), style["body"]))

    selected = [repo for repo in repos if repo["id"] in FEATURED_PROJECTS]
    rows = [[para(language["project"], style["table_head"]), para(language["technologies"], style["table_head"]), para(language["description"], style["table_head"])]]
    for repo in selected:
        content = project_content[repo["id"]]
        name = content["name"]
        if repo.get("isPrivate"):
            name = f"{name} ({language['private']})"
        rows.append([para(name, style["table"]), para(", ".join(repo["technologies"]), style["table"]), para(content["description"], style["table"])])
    table = Table(rows, colWidths=[1.35 * inch, 2.0 * inch, 4.1 * inch], repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#111827")), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#D1D5DB")), ("LEFTPADDING", (0, 0), (-1, -1), 4), ("RIGHTPADDING", (0, 0), (-1, -1), 4), ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 3)]))
    story.append(section(curriculum["pdfProjectsTitle"], style))
    story.append(table)
    document.build(story)
    assert len(PdfReader(str(output)).pages) == 2, f"Unexpected page count in {output.name}"
    return output


def build_summary(repos, message):
    locale = "es"
    curriculum = message["Curriculum"]
    experience = message["Experience"]
    education = message["Education"]
    style = styles()
    output = OUTPUT_DIR / "sintesis-curricular.pdf"
    document = SimpleDocTemplate(str(output), pagesize=letter, leftMargin=0.55 * inch, rightMargin=0.55 * inch, topMargin=0.5 * inch, bottomMargin=0.5 * inch, title="Síntesis curricular — Gustavo Colina", author="Gustavo Colina")
    story = header(style)
    story += [section("Perfil profesional", style), para(curriculum["summary"], style["body"]), section("Experiencia", style)]
    for index in (3, 1, 2):
        story.append(para(f"<b>{experience[f'exp{index}Role']}</b> · {experience[f'exp{index}Company']} · {experience[f'exp{index}Period']}", style["body"]))
    story += [section("Formación", style), para(f"<b>{education['universityTitle']}</b> · {education['universityEntity']}<br/>{education['universitySubtitle']}", style["body"]), section("Proyectos seleccionados", style)]
    for repo in repos:
        content = message["Projects"]["items"][repo["id"]]
        story.append(para(f"<b>{content['name']}</b> — {content['description']}", style["bullet"]))
    document.build(story)
    assert len(PdfReader(str(output)).pages) == 1, "The Spanish summary CV must fit on one page"
    return output


def build_markdown(repos, message):
    curriculum = message["Curriculum"]
    experience = message["Experience"]
    education = message["Education"]
    projects = message["Projects"]["items"]
    lines = ["# Síntesis curricular — Gustavo Colina", "", "## Perfil profesional", "", curriculum["summary"], "", "## Experiencia"]
    for index in (3, 1, 2):
        lines += ["", f"### {experience[f'exp{index}Role']} — {experience[f'exp{index}Company']}", "", experience[f'exp{index}Period'], "", experience[f'exp{index}Description']]
    lines += ["", "## Formación", "", f"{education['universityTitle']} — {education['universityEntity']}", "", education['universitySubtitle'], "", "## Proyectos seleccionados", ""]
    for repo in repos:
        content = projects[repo["id"]]
        name = f"{content['name']} (privado/anónimo)" if repo.get("isPrivate") else content["name"]
        lines.append(f"- **{name}:** {content['description']}")
    lines += ["", "## Contacto", "", "- Email: gustavojose0819@gmail.com", "- GitHub: https://github.com/Suggus1899", ""]
    (ROOT / "public/docs/sintesis-curricular.md").write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    OUTPUT_DIR.mkdir(exist_ok=True)
    repositories, localized_messages = load_data()
    generated = [build_cv(locale, repositories, localized_messages[locale]) for locale in LOCALES]
    summary = build_summary(repositories, localized_messages["es"])
    build_markdown(repositories, localized_messages["es"])
    shutil.copyfile(generated[0], OUTPUT_DIR / "curriculum.pdf")
    shutil.copyfile(generated[0], ROOT / "Curriculum Gustavo Colina.pdf")
    shutil.copyfile(summary, ROOT / "Sintesis Curricular Gustavo Colina.pdf")
    print("Generated four localized CVs and the Spanish summary.")
