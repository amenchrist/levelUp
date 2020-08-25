import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { selectView, selectItem, UpdateExp, RetrieveDB } from '../actions';
import { PROJECTS, STATS, TASKS, INBOX, NEW_ITEM, TASK, MISSION, TODAY, DAILY, REFERENCES, OVERVIEW } from '../constants';
import List from '../components/List';
import './Home.css';
import NewItemButton from '../components/NewItemButton';
import NewItem from '../components/NewItem';
import Details from './Details';
import Home from './Home';
import Stats from './Stats';


const mapStateToProps = state => {
    return {
        view: state.selectViewReducer.view,
        previousView: state.selectViewReducer.previousView,
        itemID: state.selectItemReducer.itemID,
        exp: state.UpdateExpReducer.exp,
        db: state.RetrieveDBReducer.db
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTouch: (title) => {
            return dispatch(selectView(title))
        },
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        },
        updateExp: (exp) => {
            return dispatch(UpdateExp(exp))
        },
        retrieveDB: (db) => {
            return dispatch(RetrieveDB(db))
        }
    }
}


function Main(props) {

    const { view, itemID, onTouch, changeItemID, previousView, updateExp, exp, retrieveDB, db } = props;

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    //const [items, setItems] = useState([]);
    // const [database, setDatabase] = useState({});

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("https://secret-citadel-16777.herokuapp.com/")
        .then(res => res.json())
        .then(
            (result) => {
                retrieveDB(result);
                setIsLoaded(true);
                //setDatabase(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }, [retrieveDB])


    let dbCombined = [];


    if (db.Inbox) {
        //console.log('db.inbox = ',db.Inbox);
        dbCombined = db.Inbox.concat(db.Projects, db.Tasks);
        //console.log(dbCombined);
    }


    //console.log(typeof dbCombined);

    // if (error) {
    //     //return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //     //
    // }

    
    let type;

    switch(previousView) {
        case TASKS:
            type = TASK;
        break;
        case PROJECTS:
            type = MISSION;
        break;
        default:
    }
    
    //const db = ProjectList.concat(TaskList, ReferenceList);
    
    function passKey(e) {
        //Takes the events target and checks for title attribute 
        //If no title attribute, check parent node for title attribute
        //If not found, repeat step 2
        let targ = e.target;
        checkForID(targ);
        function checkForID (t) {
            if (t.id) {
                changeItemID(t.id);
            } else {
                t = t.parentNode;
                checkForID (t);   
            }
        }
    }

    function passTitle(e) {
        let targ = e.target;
        checkForTitle(targ)
        function checkForTitle (t) {
            if (t.title) {
                 onTouch(t.title);
            } else {
                t = t.parentNode;
                checkForTitle (t);   
            }
        }
    }

    const views = [ NEW_ITEM, PROJECTS, TASKS, INBOX, TODAY, DAILY, REFERENCES ];

    if(isLoaded){

        switch( true) {
            case (view === STATS):
                return (
                    <Stats />
                )
            case (view === OVERVIEW && parseInt(itemID) !== 0 ):
                return (
                    <div className='h-100 pa2 '>
                            <div className='h-10'>
                                <h5>EXP: {exp}</h5>
                            </div>
                            <div className='h-90 pa1'>
                                <Details content={dbCombined} itemID={itemID} selectAnother={changeItemID} />
                            </div>
                        </div>
                )
            case views.indexOf(view) !== -1 :
                if (itemID === "0" || itemID === 0) { // Imagine the id for list component = 0
                    if (view === NEW_ITEM) {
                        return (
                            <div className='h-100 pa2'>
                                <div className=' h-10'>
                                    <h5>EXP: {exp}</h5>
                                </div>
                                <div className='h-90'>
                                    <NewItem submitFunction={passTitle} view={type} updateExp={updateExp} />
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className='h-100'>
                                <div className='h-10'>
                                    <h5>EXP: {exp}</h5>
                                </div>
                                <div className='h-90 pa1'>
                                    <div className='h-100 w-100 center pa1'>
                                        <h1 className='tc b gold ma0 pb2'>{view}</h1>
                                        <div className=' h-80 '>
                                            <List content={dbCombined} filter={view} touchFunction={passKey}/>
                                        </div>
                                        <div className='h-10 flex w-100 content-end pa2'>
                                            <NewItemButton touchFunction={passTitle} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        )
                    }
                } else {
                    return (
                        <div className='h-100 pa2 '>
                                <div className='h-10'>
                                    <h5>EXP: {exp}</h5>
                                </div>
                                <div className='h-90 pa1'>
                                    <Details content={dbCombined} itemID={itemID} selectAnother={changeItemID} />
                                </div>
                            </div>
                    )
                }
            default:
                return (
                    <Home />
                );
        }
    } else {
        return <div>Loading...</div>;
      } 

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);


//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8