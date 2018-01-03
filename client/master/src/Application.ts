// TypeScript file

class Application {
    public static Init(){
        ResourceManager.Instance.Init()
        PlayerManager.Instance.Init()
        RoomManager.Instance.Init()
        ChatManager.Instance.Init()
    }
}