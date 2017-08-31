import { UserConversation } from '../models/user_conversation'
import Controller from './base';

export default class UserConversationController extends Controller {
  model = UserConversation
}
