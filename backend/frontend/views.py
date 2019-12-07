from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import UserSerializer, User
from rest_framework.decorators import action
from django.contrib.auth import login
from rest_framework.response import Response
from django.shortcuts import render


class UserViewset(ModelViewSet):
    
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(methods=['POST'], url_path='login', detail=False)
    def login(self, request):
        
        username = request.data.get('username')
        pwd = request.data.get('password')

        res = {
            'code': 0,
            'msg': '',
            'data': {}
        }
        if not all([username, pwd]):
            res['msg'] = '参数异常。'
            return Response(res)
        print(request.data)
        try:
            user = User.objects.get(username=username, password=pwd)
        except:
            res['msg'] = '用户名或者密码错误，请重新登陆。'
            return Response(res)
        if user.is_active != 1:
            res['msg'] = '用户不可用，请重新登陆。'
            return Response(res)

        login(request, user)
        request.session['login'] = True
        request.session['FS_YWPT'] = True
        request.session.set_expiry(0)
        res['msg'] = '登陆成功'
        res['code'] = 1
        res['data'] = {'username': username}
        return Response(res)

    @action(methods=['POST'], url_path='register', detail=False)
    def register(self, request):
        
        password = request.data.get('password')
        username = request.data.get('username')
        res = {
            'code': 0,
            'msg': '',
            'data': {}
        }

        if not all([ password, username]):
            res['msg'] = '参数异常。'
            return Response(res)

        print([password, username])
        if User.objects.filter(username=username):
            res['msg'] = '用户已存在。'
            return Response(res)

        User.objects.create(password=password, username=username)
        res['code'] = 1
        res['data'] = [password, username]
        return Response(res)


def index(request):
    return render(request, 'index.html')