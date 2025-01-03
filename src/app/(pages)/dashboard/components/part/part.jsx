"use client"
import ButtonDelete from '../button-delete/buttonDelete';
import ButtonEdit from '../button-edit/buttonEdit';
import './part.css'
const Part = ({titlePart, photo}) => {
    
    return (
        <div className="part">
            <img className='photo-part' src={photo} alt="photo" lazy="loading"/>
            <h1 className='title-part'>{titlePart}</h1>
            <div className='con-btn'>
                <ButtonEdit titlePart={titlePart}/>
                <ButtonDelete/>
            </div>
        </div>
    );
}

export default Part;
