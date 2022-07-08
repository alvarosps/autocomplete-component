import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './AutoComplete.css';

interface Spell {
  index: string;
  name: string;
  url: string;
}

// For now, it is an Autocomplete component only for this API, can be improved to work with any API wanted
const AutoComplete: React.FC = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const [options, setOptions] = useState<Spell[]>([]);
  const [search, setSearch] = useState<string>("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getSpells = async () => {
      const response = await axios.get('/spells', {
        baseURL: "https://www.dnd5eapi.co/api",
      });

      const spells: Spell[] = response.data.results;
      setOptions(spells);      
    }

    getSpells();
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false)
    }
  }

  const updateSearchedSpell = (spell: string) => {
    setSearch(spell);
    setDisplay(false);
  }

  const hightlight = (text: string) => {
    const spellNameDivs = document.getElementsByClassName("spellName");

    for (let i = 0 ; i < spellNameDivs.length; i++) {
        const spellNameDiv = spellNameDivs[i];
        let innerText = (spellNameDiv as HTMLElement).innerText;
        const index = innerText.toLowerCase().indexOf(text.toLowerCase());
        if (index >= 0) {
            innerText = innerText.substring(0, index) +
                "<span class='highlight'>" + innerText.substring(index, index + text.length) + "</span>" +
                innerText.substring(index + text.length);
            spellNameDiv.innerHTML = innerText;
        }
    }
  }

  useEffect(() => {
    hightlight(search);
  }, [search]);

  return (
    <div className='auto-complete'>
        <div ref={wrapperRef} className="flex-container flex-column pos-rel">
        <input
            id="auto"
            onClick={() => setDisplay(!display)}
            placeholder="Type to search"
            value={search}
            onChange={event => setSearch(event.target.value)}
        />
        {
            display && (
            <div className="autoContainer">
                {
                    options.filter( ({ name }) => name.toLowerCase().includes(search.toLowerCase()) )
                        .map( (value, i) => {
                        return (
                            <div
                            onClick={() => updateSearchedSpell(value.name)}
                            className="option"
                            key={i}
                            tabIndex={0}
                            >
                            <span className="spellName">{value.name}</span>
                            </div>
                        );
                    })
                }
            </div>
            )
        }
        </div>
    </div>
  )
}

export default AutoComplete;