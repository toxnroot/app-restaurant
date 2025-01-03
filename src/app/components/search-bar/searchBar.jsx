import React from 'react';
import styled from 'styled-components';

const SearchBar = () => {
  return (
    <StyledWrapper>
      <div className="search">
        <input type="text" className="search__input" placeholder="بحث عن وجبة" />
        <button className="search__button">
          <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
            </g>
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    width: 100%;
    position: relative;
    font-size: 1rem;
  }

  .search__input {
    font-family: inherit;
    font-size: inherit;
    background-color: #f4f2f2;
    border: none;
    color: #4f4e4e;
    padding:7px;
    border-radius: 30px;
    width: auto;
    transition: all ease-in-out .5s;
    text-align: right;
   
  }

  .search__input:hover, .search__input:focus {
    box-shadow: 0 0 1em #00000013;
  }

  .search__input:focus {
    outline: none;
    background-color: #f0eeee;
  }

  .search__input::-webkit-input-placeholder {
    font-weight: 100;
    color: #4f4e4e;
  }

  .search__input:focus + .search__button {
    background-color: #f0eeee;
  }

  .search__button {
    border: none;
    background-color: #f4f2f2;
    margin-top: .1em;
  }

  .search__button:hover {
    cursor: pointer;
  }

  .search__icon {
    height: 1.3em;
    width: 1.3em;
    fill: #b4b4b4;
    position: absolute;
    left: 10px;
    top: 9px;
  }`;

export default SearchBar;
