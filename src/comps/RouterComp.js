import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CreateUser from './Users/CreateUser'
import EditUser from './Users/EditUser'
import LoginComp from './LoginComp'
import MainPage from './MainPage'
import UsersManagement from './Users/UsersManagement'
import MoviesPage from './Movies/MoviesPage'
import EditMovie from './Movies/EditMovie'
import Subscriptions from './Subscriptions/SubscriptionsMain'
import SpecificMovie from './Movies/SpecificMovieComp'
import EditMember from './Members/EditMember'

const RouterComp = (props) => {

    return (
        <div>
            <Switch>
                <Route path="/" exact component={LoginComp} />
                <Route path="/createAccount" component={CreateUser} />
                <Route path="/mainPage" component={MainPage} />
                <Route path="/movies/:page" component={MoviesPage} />
                <Route path="/subscriptions" component={Subscriptions} />
                <Route path="/editUser" component={EditUser} />
                <Route path="/editmovie" component={EditMovie} />
                <Route path="/editMember" component={EditMember} />
                <Route path="/usersManagement" component={UsersManagement} />
                <Route path="/movie/:id" component={SpecificMovie} />
            </Switch>
        </div>
    )
}

export default RouterComp;