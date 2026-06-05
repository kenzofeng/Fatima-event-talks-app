const fs = require('fs');
const path = require('path');

// Load talks data
const talks = JSON.parse(fs.readFileSync(path.join(__dirname, 'talks.json'), 'utf8'));

// Generate HTML for each talk
const talksHtml = talks.map(talk => {
    const categoriesHtml = talk.categories.map(cat => `<span class="category-badge">${cat}</span>`).join('');
    const speakersText = talk.speakers.length > 0 ? `By ${talk.speakers.join(' & ')}` : '';
    const breakClass = talk.isBreak ? 'break' : '';
    
    return `
        <div class="talk-card ${breakClass}" data-categories="${talk.categories.join(', ')}">
            <div class="time-tag">${talk.startTime} - ${talk.endTime}</div>
            <h2 class="talk-title">${talk.title}</h2>
            ${talk.speakers.length > 0 ? `<div class="speakers">${speakersText}</div>` : ''}
            <div class="description">${talk.description}</div>
            <div class="categories">
                ${categoriesHtml}
            </div>
        </div>
    `;
}).join('');

// Load template
let template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

// Inject talks HTML
const finalHtml = template.replace('<!-- TALKS_JSON_PLACEHOLDER -->', talksHtml);

// Write to index.html
fs.writeFileSync(path.join(__dirname, 'index.html'), finalHtml);

console.log('Successfully generated index.html!');
