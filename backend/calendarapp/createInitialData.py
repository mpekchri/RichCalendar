from CalendarBackend import models
from datetime import datetime

def create_data():
    # Initial state goes here
    # user = models.User(name="dummyAdmin")
    # user.set_password('1QJhbiLQiLC1QiJhbGci')
    # user.save()
    user = models.User.objects.get(name="dummyAdmin")
    domainModel = models.DomainModel()
    state = models.State()
    state.save()
    domainModel.currentState = state
    state.users.add(user)
    task = models.Task(
            name="Build a wall",
            fromDate=datetime.now().replace(day=2),
            toDate=datetime.now().replace(day=8),
            visibility="OT",
            status="P",
            priority="HST",          
    )
    task.save()
    state.tasks.add(task)
    task = models.Task(
            name="Find a way to pay the wall",
            fromDate=datetime.now().replace(day=4),
            toDate=datetime.now().replace(day=5),
            visibility="OT",
            status="P",
            priority="M",
            createdBy=user                
    )
    task.save()
    state.tasks.add(task)
    task = models.Task(
            name="Wall is cool",
            fromDate=datetime.now().replace(day=6),
            toDate=datetime.now().replace(day=10),
            visibility="OT",
            status="P",
            priority="M",
            createdBy=user                
    )
    task.save()
    state.tasks.add(task)
    task = models.Task(
            name="Build another ?",
            fromDate=datetime.now().replace(day=6),
            toDate=datetime.now().replace(day=10),
            visibility="OT",
            status="P",
            priority="H",
            createdBy=user              
    )
    task.save()
    state.tasks.add(task)
    # Finally :
    domainModel.save()
