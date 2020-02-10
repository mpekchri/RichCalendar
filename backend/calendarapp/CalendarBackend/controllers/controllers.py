from CalendarBackend.proxies.proxies import AuthProxy
from CalendarBackend import models


class BackendMainController:
    @staticmethod
    def loadInitialData():
        pass

    @staticmethod
    def loadMonthTasks(filters, searchText, selectedDate, user):
        domainModel = models.DomainModel.objects.get(pk=1) # there is always one and only one domainModel
        state = domainModel.currentState
        tasks = state.applyFilters_getMonth(filters, searchText, selectedDate, user)
        return tasks


class AuthController:
    @staticmethod
    def login(username, password):
        user = AuthProxy.login(username, password)
        if user is None:
            return None
        else:
            token = user.auth_token.key
            return token


    @staticmethod
    def logout():
        pass