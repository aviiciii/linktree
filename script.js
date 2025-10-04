document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        const linksSection = document.getElementById('links');
        const socialsSection = document.getElementById('socials');

        data.sections.forEach(section => {
            // Handle Socials separately (icons)
            if (section.header === "Socials") {
                const ul = document.createElement('ul');
                ul.className = 'socials-ul';

                section.links.forEach(link => {
                    const li = document.createElement('li');
                    li.className = 'socials-li';

                    const a = document.createElement('a');
                    a.id = link.id;
                    a.className = 'socials-a';
                    a.href = link.url;
                    a.target = '_blank';

                    const img = document.createElement('img');
                    img.className = 'socials-img';
                    img.width = 50;
                    img.height = 50;
                    img.src = link.icon;
                    img.alt = link.name;

                    a.appendChild(img);
                    li.appendChild(a);
                    ul.appendChild(li);
                });

                socialsSection.appendChild(ul);
            } 
            // Handle other link sections
            else {
                const container = document.createElement('div');
                container.className = 'link-container';

                // Portfolio section has no header
                if (section.header !== "Portfolio") {
                    const header = document.createElement('div');
                    header.className = 'link-header';
                    const h2 = document.createElement('h2');
                    h2.textContent = section.header;
                    header.appendChild(h2);
                    container.appendChild(header);
                }

                const list = document.createElement('div');
                list.className = 'link-list';

                section.links.forEach(link => {
                    const a = document.createElement('a');
                    a.id = link.id;
                    a.className = 'link-a';
                    a.href = link.url;
                    a.target = '_blank';
                    a.textContent = link.name;
                    list.appendChild(a);
                });

                container.appendChild(list);
                linksSection.appendChild(container);
            }
        });

        // Set copyright year
        document.getElementById('copyright').textContent = new Date().getFullYear();

    } catch (err) {
        console.error('Error loading data.json:', err);
    }
});